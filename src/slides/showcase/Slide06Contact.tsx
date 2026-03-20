import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { MediaUploadZone } from '@/components/slides/MediaUploadZone';
import { MediaCarousel } from '@/components/slides/MediaCarousel';
import { EditableText } from '@/components/slides/EditableText';

export default function Slide06Contact() {
  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/10 via-black to-black" />

      <div className="relative z-10 flex h-full px-20 py-16">
        {/* Left */}
        <div className="w-[45%] flex flex-col justify-center pr-12">
          <div className="w-44 h-44 mb-10">
            <MediaUploadZone
              label="Logo"
              accept="image"
              orientation="square"
              className="w-full h-full border-[#D4A843]/40"
            />
          </div>

          <EditableText
            defaultValue="Vamos trabalhar juntos"
            className="type-display text-white mb-6"
            tag="h2"
          />
          <EditableText
            defaultValue="Entre em contato para orçamentos e parcerias"
            className="type-body-lg text-white/50 mb-12"
            tag="p"
          />

          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <Phone className="w-8 h-8 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="(XX) XXXXX-XXXX" className="type-h3 text-white/70" tag="span" />
            </div>
            <div className="flex items-center gap-5">
              <Mail className="w-8 h-8 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="contato@pingo.com.br" className="type-h3 text-white/70" tag="span" />
            </div>
            <div className="flex items-center gap-5">
              <Instagram className="w-8 h-8 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="@pingo.oficial" className="type-h3 text-white/70" tag="span" />
            </div>
            <div className="flex items-center gap-5">
              <MapPin className="w-8 h-8 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="Região Sul — Brasil" className="type-h3 text-white/70" tag="span" />
            </div>
          </div>
        </div>

        {/* Right - Final media carousel */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          <MediaCarousel orientation="horizontal" className="w-full" maxItems={8} />
          <MediaCarousel orientation="vertical" className="w-full max-h-[350px]" maxItems={4} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
