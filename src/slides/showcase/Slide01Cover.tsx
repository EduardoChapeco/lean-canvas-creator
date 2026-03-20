import React from 'react';
import { MediaUploadZone } from '@/components/slides/MediaUploadZone';
import { EditableText } from '@/components/slides/EditableText';

export default function Slide01Cover() {
  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#D4A843]/20" />

      <div className="relative z-10 flex h-full">
        {/* Left - Text */}
        <div className="flex-1 flex flex-col justify-center px-20 py-16">
          {/* Small logo upload */}
          <div className="w-36 h-36 mb-10">
            <MediaUploadZone
              label="Logo"
              accept="image"
              orientation="square"
              className="w-full h-full border-[#D4A843]/40"
            />
          </div>

          <h1 className="type-display text-white mb-6">
            <EditableText defaultValue="PINGO" className="text-[#D4A843]" tag="span" />
          </h1>

          <EditableText
            defaultValue="João Deivson Poletti"
            className="type-h2 text-white/80 font-light mb-8"
            tag="p"
          />

          <EditableText
            defaultValue="PROPOSTA SOM, LUZ, EFEITOS PARA FORMATURA"
            className="type-h1 text-white leading-tight mb-8"
            tag="h2"
            multiline
          />

          <div className="flex items-center gap-5 type-body-lg text-white/60">
            <EditableText defaultValue="Produção" className="text-white/60" tag="span" />
            <span className="w-2 h-2 rounded-full bg-[#D4A843]" />
            <EditableText defaultValue="Efeitos Especiais" className="text-white/60" tag="span" />
            <span className="w-2 h-2 rounded-full bg-[#D4A843]" />
            <EditableText defaultValue="Pirotecnia" className="text-white/60" tag="span" />
          </div>
        </div>

        {/* Right - Large media card */}
        <div className="w-[45%] flex items-center justify-center pr-16">
          <MediaUploadZone
            label="Upload mídia principal"
            accept="both"
            orientation="vertical"
            large
            className="w-full h-[85%] border-[#D4A843]/40"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
