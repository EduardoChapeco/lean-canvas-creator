import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ScaledSlide } from '@/components/slides/ScaledSlide';
import { BlockRenderer } from '@/components/editor/BlockRenderer';
import type { SlideData } from '@/types/presentation';

export default function PresentationView() {
  const { id } = useParams<{ id: string }>();
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data: slidesData } = await supabase
        .from('slides')
        .select('*')
        .eq('presentation_id', id)
        .order('order');

      const loaded: SlideData[] = [];
      for (const s of slidesData || []) {
        const { data: blocksData } = await supabase
          .from('blocks')
          .select('*')
          .eq('slide_id', s.id)
          .order('z_index');

        loaded.push({
          id: s.id,
          order: s.order,
          blocks: (blocksData || []).map((b) => ({
            id: b.id,
            type: b.type as any,
            position: b.position as any,
            size: b.size as any,
            zIndex: b.z_index,
            locked: b.locked ?? false,
            ...(b.props as any),
          })),
          background: (s.background as any) || { type: 'color', value: '#000000' },
          notes: s.notes || '',
          template: s.template || undefined,
        });
      }
      setSlides(loaded);
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentIndex((i) => Math.min(slides.length - 1, i + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Escape') {
        window.close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [slides.length]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Carregando...</div>;
  if (slides.length === 0) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Apresentação não encontrada</div>;

  const slide = slides[currentIndex];
  const bgStyle: React.CSSProperties = {
    background: slide.background.type === 'color' ? slide.background.value : slide.background.value,
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <ScaledSlide>
        <div className="w-[1920px] h-[1080px] relative" style={bgStyle}>
          {slide.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isSelected={false}
              onSelect={() => {}}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </ScaledSlide>
      <div className="fixed bottom-4 right-4 text-white/40 text-sm">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
}
