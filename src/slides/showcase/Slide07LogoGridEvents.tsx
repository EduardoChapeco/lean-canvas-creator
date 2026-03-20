import React from 'react';
import { MediaUploadZone } from '@/components/slides/MediaUploadZone';

export default function Slide07LogoGridEvents() {
  const smallSlots = Array.from({ length: 16 });

  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#D4A843]/10" />

      <div className="relative z-10 flex flex-col h-full px-20 py-16">
        <h2 className="type-h1 text-white mb-4 text-center">
          Eventos & Parceiros
        </h2>
        <p className="type-body-lg text-white/50 text-center mb-10">
          Festas, feiras e eventos que trabalhamos
        </p>

        {/* Grid: center logo big, surrounding smaller logos */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-6 grid-rows-4 gap-4 w-full max-w-[1600px]">
            {/* Row 1: 6 small */}
            {smallSlots.slice(0, 6).map((_, i) => (
              <div key={`r1-${i}`} className="aspect-square">
                <MediaUploadZone
                  label=""
                  accept="image"
                  orientation="square"
                  className="w-full h-full border-[#D4A843]/20"
                />
              </div>
            ))}

            {/* Row 2: 2 small + center big (2x2) + 2 small */}
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            <div className="col-span-2 row-span-2 flex items-center justify-center">
              <MediaUploadZone
                label="Logo PINGO"
                accept="image"
                orientation="square"
                large
                className="w-full h-full border-[#D4A843]/50 bg-[#D4A843]/5"
              />
            </div>
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>

            {/* Row 3: 2 small + (center continues) + 2 small */}
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            {/* center 2x2 continues */}
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>
            <div className="aspect-square">
              <MediaUploadZone label="" accept="image" orientation="square" className="w-full h-full border-[#D4A843]/20" />
            </div>

            {/* Row 4: 6 small */}
            {smallSlots.slice(0, 6).map((_, i) => (
              <div key={`r4-${i}`} className="aspect-square">
                <MediaUploadZone
                  label=""
                  accept="image"
                  orientation="square"
                  className="w-full h-full border-[#D4A843]/20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
