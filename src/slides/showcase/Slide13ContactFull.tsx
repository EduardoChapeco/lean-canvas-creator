import React from 'react';
import { Mail, Phone, MapPin, Instagram, Globe, MessageCircle } from 'lucide-react';
import { MediaUploadZone } from '@/components/slides/MediaUploadZone';
import { EditableText } from '@/components/slides/EditableText';

export default function Slide13ContactFull() {
  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/15 via-black to-black" />
      <div className="relative z-10 flex h-full">
        <div className="w-[55%] flex flex-col justify-center px-24 py-16">
          <div className="w-48 h-48 mb-12">
            <MediaUploadZone label="Logo" accept="image" orientation="square"
              className="w-full h-full border-[#D4A843]/40" />
          </div>
          <EditableText defaultValue="PINGO" className="type-display text-white mb-4" tag="h2" />
          <EditableText defaultValue="Som • Luz • Efeitos Especiais" className="type-h2 text-[#D4A843] mb-12" tag="p" />
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <Phone className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="(XX) XXXXX-XXXX" className="type-h2 text-white" tag="span" />
            </div>
            <div className="flex items-center gap-6">
              <MessageCircle className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="(XX) XXXXX-XXXX" className="type-h2 text-white" tag="span" />
            </div>
            <div className="flex items-center gap-6">
              <Mail className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="contato@pingo.com.br" className="type-h2 text-white" tag="span" />
            </div>
            <div className="flex items-center gap-6">
              <Instagram className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="@pingo.oficial" className="type-h2 text-white" tag="span" />
            </div>
            <div className="flex items-center gap-6">
              <Globe className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="www.pingo.com.br" className="type-h2 text-white" tag="span" />
            </div>
            <div className="flex items-center gap-6">
              <MapPin className="w-10 h-10 text-[#D4A843] flex-shrink-0" />
              <EditableText defaultValue="Região Sul — Brasil" className="type-h2 text-white" tag="span" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-16">
          <div className="w-[500px] h-[500px]">
            <MediaUploadZone label="Foto / QR Code" accept="image" orientation="square"
              className="w-full h-full border-[#D4A843]/30" large />
          </div>
          <EditableText
            defaultValue="Escaneie o QR Code ou entre em contato pelos canais ao lado"
            className="type-body-lg text-white/40 text-center"
            tag="p"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
