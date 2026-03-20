import React from 'react';
import type { Block } from '@/types/blocks';

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
}

export function BlockRenderer({ block, isSelected, onSelect, onUpdate, onDelete }: BlockRendererProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: block.position.x,
    top: block.position.y,
    width: block.size.width,
    height: block.size.height,
    zIndex: block.zIndex,
    outline: isSelected ? '2px solid hsl(var(--slide-accent))' : 'none',
    cursor: block.locked ? 'default' : 'move',
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <div
            className="w-full h-full p-4 overflow-hidden"
            style={{ fontSize: block.fontSize, fontWeight: block.fontWeight, color: block.color, textAlign: block.align }}
          >
            {block.content || 'Clique para editar texto'}
          </div>
        );
      case 'image':
        return block.src ? (
          <img src={block.src} alt="" className="w-full h-full" style={{ objectFit: block.fit, borderRadius: block.borderRadius }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 border-2 border-dashed border-white/20 rounded-xl">
            <span className="text-white/40 type-caption">Upload imagem</span>
          </div>
        );
      case 'video':
        return block.src ? (
          <video src={block.src} controls className="w-full h-full object-cover rounded-xl" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 border-2 border-dashed border-white/20 rounded-xl">
            <span className="text-white/40 type-caption">Upload vídeo</span>
          </div>
        );
      case 'card':
        return (
          <div className={`w-full h-full p-6 rounded-xl ${block.variant === 'dark' ? 'bg-white/10 text-white' : block.variant === 'accent' ? 'bg-[#D4A843]/20 text-white' : 'bg-white/5 text-white'}`}>
            {block.icon && <span className="text-3xl mb-2 block">{block.icon}</span>}
            <h3 className="type-h3 font-bold mb-2">{block.title || 'Título'}</h3>
            <p className="type-body text-white/70">{block.description || 'Descrição'}</p>
          </div>
        );
      case 'metric':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <span className="type-metric font-bold">{block.prefix}{block.value}{block.suffix}</span>
            <span className="type-caption text-white/60 mt-2">{block.label}</span>
          </div>
        );
      case 'quote':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
            <p className="type-body-lg italic text-center">"{block.text}"</p>
            <span className="type-caption text-white/60 mt-4">— {block.author}{block.role ? `, ${block.role}` : ''}</span>
          </div>
        );
      case 'divider':
        return (
          <div className="w-full h-full flex items-center">
            <div className="w-full h-[2px]" style={{ borderStyle: block.style === 'gradient' ? 'solid' : block.style, borderTopWidth: 2, borderColor: block.color, background: block.style === 'gradient' ? `linear-gradient(to right, transparent, ${block.color}, transparent)` : undefined }} />
          </div>
        );
      case 'badge':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${block.variant === 'accent' ? 'bg-[#D4A843] text-black' : block.variant === 'outline' ? 'border border-white/30 text-white' : 'bg-white/10 text-white'}`}>
              {block.text}
            </span>
          </div>
        );
      case 'image-grid':
        return (
          <div className="w-full h-full grid gap-2 p-2" style={{ gridTemplateColumns: `repeat(${block.columns}, 1fr)` }}>
            {block.images.map((img) => (
              <div key={img.id} className="bg-white/5 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                {img.src ? <img src={img.src} alt={img.label || ''} className="w-full h-full object-cover" /> : <span className="text-white/30 text-xs">{img.label || '+'}</span>}
              </div>
            ))}
          </div>
        );
      case 'timeline':
        return (
          <div className="w-full h-full flex items-center gap-4 px-8">
            {block.nodes.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center text-white text-center flex-1">
                  <div className="w-4 h-4 rounded-full bg-[#D4A843] mb-2" />
                  {node.year && <span className="type-caption text-[#D4A843] font-bold">{node.year}</span>}
                  <span className="type-body font-semibold">{node.title}</span>
                  <span className="type-caption text-white/50">{node.description}</span>
                </div>
                {i < block.nodes.length - 1 && <div className="flex-1 h-[2px] bg-[#D4A843]/30" />}
              </React.Fragment>
            ))}
          </div>
        );
      case 'carousel':
        return (
          <div className={`w-full h-full flex ${block.orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-2 overflow-hidden p-2`}>
            {block.items.map((item) => (
              <div key={item.id} className="flex-1 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center min-w-0 min-h-0">
                {item.src ? (
                  item.type === 'video' ? <video src={item.src} className="w-full h-full object-cover" /> : <img src={item.src} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/30 type-caption">+</span>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/30">Bloco desconhecido</div>;
    }
  };

  return (
    <div style={style} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      {renderContent()}
      {isSelected && !block.locked && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs z-50"
        >
          ✕
        </button>
      )}
    </div>
  );
}
