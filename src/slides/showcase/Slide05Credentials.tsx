import React from 'react';
import { Shield, Award, BadgeCheck } from 'lucide-react';
import { MediaUploadZone } from '@/components/slides/MediaUploadZone';

export default function Slide05Credentials() {
  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#D4A843]/10" />

      <div className="relative z-10 flex h-full px-20 py-16">
        {/* Left - Credentials info */}
        <div className="w-[40%] flex flex-col justify-center pr-12">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-[#D4A843]" />
            <span className="type-body-lg text-[#D4A843] uppercase tracking-widest font-semibold">Credenciais</span>
          </div>

          <h2 className="type-display text-white mb-12 leading-tight">
            Blaster Pirotécnico
          </h2>

          <div className="space-y-8">
            <div className="flex gap-5 items-start p-6 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-10 h-10 text-[#D4A843] flex-shrink-0 mt-1" />
              <div>
                <p className="type-h3 font-semibold text-white">Autorização — Exército</p>
                <p className="type-body text-white/50 mt-2">Treinamento e certificação no manuseio de fogos de artifício e efeitos pirotécnicos</p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-6 rounded-xl bg-white/5 border border-white/10">
              <BadgeCheck className="w-10 h-10 text-[#D4A843] flex-shrink-0 mt-1" />
              <div>
                <p className="type-h3 font-semibold text-white">Carteira — Polícia Civil</p>
                <p className="type-body text-white/50 mt-2">Técnico autorizado para manuseio de materiais pirotécnicos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Large upload for credential photo */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          <MediaUploadZone
            label="Upload da carteira de Blaster"
            accept="image"
            orientation="horizontal"
            large
            className="border-[#D4A843]/40 min-h-[450px]"
          />
          <div className="flex gap-5">
            <MediaUploadZone
              label="Vídeo vertical"
              accept="video"
              orientation="vertical"
              className="flex-1 border-[#D4A843]/20 max-h-[240px]"
            />
            <MediaUploadZone
              label="Vídeo horizontal"
              accept="video"
              orientation="horizontal"
              className="flex-1 border-[#D4A843]/20 max-h-[240px]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
