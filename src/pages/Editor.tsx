import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePresentationStore } from '@/stores/presentationStore';
import { BlockToolbar } from '@/components/editor/BlockToolbar';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { SlideManager } from '@/components/editor/SlideManager';
import { DragDropCanvas } from '@/components/editor/DragDropCanvas';
import { ScaledSlide } from '@/components/slides/ScaledSlide';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Download, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Block } from '@/types/blocks';

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentPresentation,
    currentSlideIndex,
    selectedBlockId,
    loading,
    loadPresentation,
    updatePresentation,
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    duplicateSlide,
    selectBlock,
    addBlock,
    updateBlock,
    deleteBlock,
  } = usePresentationStore();

  useEffect(() => {
    if (id) loadPresentation(id);
  }, [id, loadPresentation]);

  const currentSlide = currentPresentation?.slides[currentSlideIndex];
  const selectedBlock = currentSlide?.blocks.find((b) => b.id === selectedBlockId) || null;

  const handleAddBlock = useCallback((block: Omit<Block, 'id'>) => {
    if (!currentSlide) return;
    addBlock(currentSlide.id, block);
  }, [currentSlide, addBlock]);

  const handleUpdateBlock = useCallback((blockId: string, updates: Partial<Block>) => {
    updateBlock(blockId, updates);
  }, [updateBlock]);

  const handleDeleteBlock = useCallback((blockId: string) => {
    deleteBlock(blockId);
  }, [deleteBlock]);

  if (loading || !currentPresentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground">Carregando apresentação...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-12 border-b border-border flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Input
          value={currentPresentation.title}
          onChange={(e) => updatePresentation(currentPresentation.id, { title: e.target.value })}
          className="h-8 w-64 text-sm font-medium bg-transparent border-none focus-visible:ring-1"
        />
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => navigate(`/present/${currentPresentation.id}`)}>
          <Play className="w-3.5 h-3.5" /> Apresentar
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Slide manager */}
        <SlideManager
          slides={currentPresentation.slides}
          currentIndex={currentSlideIndex}
          onSlideClick={setCurrentSlideIndex}
          onAddSlide={(afterIndex) => addSlide(afterIndex)}
          onDeleteSlide={deleteSlide}
          onDuplicateSlide={duplicateSlide}
        />

        {/* Block toolbar */}
        <BlockToolbar onAddBlock={handleAddBlock} />

        {/* Main canvas */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-muted/30 p-8">
          {currentSlide ? (
            <ScaledSlide>
              <DragDropCanvas
                slide={currentSlide}
                selectedBlockId={selectedBlockId}
                onSelectBlock={selectBlock}
                onUpdateBlock={handleUpdateBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            </ScaledSlide>
          ) : (
            <div className="text-muted-foreground">Nenhum slide selecionado</div>
          )}
        </div>

        {/* Property panel */}
        <PropertyPanel
          block={selectedBlock}
          onUpdate={(updates) => selectedBlockId && handleUpdateBlock(selectedBlockId, updates)}
          onDelete={() => selectedBlockId && handleDeleteBlock(selectedBlockId)}
        />
      </div>
    </div>
  );
}
