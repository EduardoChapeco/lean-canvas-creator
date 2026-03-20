import React, { useRef, useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Film } from 'lucide-react';

function LargeMediaCard({ label }: { label: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [media, setMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    setMedia({ url, type });
    setPlaying(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0"
         style={{ width: '1680px', height: '880px' }}>
      <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); if (e.target) e.target.value = ''; }} />
      
      {!media ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/30 cursor-pointer"
             onClick={() => inputRef.current?.click()}>
          <Play className="w-24 h-24 mb-4" strokeWidth={1} />
          <span className="type-h2 text-white/40">{label}</span>
          <span className="type-body text-white/20 mt-2">Clique para upload de mídia 16:9</span>
        </div>
      ) : media.type === 'image' ? (
        <div className="w-full h-full cursor-pointer" onClick={() => inputRef.current?.click()}>
          <img src={media.url} alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="type-h3 text-white font-semibold">{label}</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative cursor-pointer" onClick={togglePlay}>
          <video ref={videoRef} src={media.url} className="w-full h-full object-cover"
                 onEnded={() => setPlaying(false)} playsInline />
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-28 h-28 text-white" fill="white" />
            </div>
          )}
          {playing && <div className="absolute bottom-6 right-6"><Pause className="w-12 h-12 text-white/70" /></div>}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="type-h3 text-white font-semibold">{label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Slide12ExecutiveShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -1700 : 1700, behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full relative font-sans slide-content bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#D4A843]/10" />
      <div className="relative z-10 flex flex-col h-full px-16 py-10">
        <div className="flex items-center gap-4 mb-2">
          <Film className="w-10 h-10 text-[#D4A843]" />
          <h2 className="type-h1 text-white">Portfólio Visual</h2>
        </div>
        <p className="type-body-lg text-white/50 mb-6">Arraste para ver mais — clique para upload</p>
        <div className="flex-1 relative flex items-center">
          <button onClick={() => scroll('left')}
            className="absolute -left-2 z-20 w-14 h-14 rounded-full bg-[#D4A843]/90 text-black flex items-center justify-center hover:bg-[#D4A843] transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={() => scroll('right')}
            className="absolute -right-2 z-20 w-14 h-14 rounded-full bg-[#D4A843]/90 text-black flex items-center justify-center hover:bg-[#D4A843] transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div ref={scrollRef} className="flex gap-10 overflow-x-auto scrollbar-hide px-4 py-2 w-full"
               style={{ scrollSnapType: 'x mandatory' }}>
            {['Evento Destaque 1', 'Evento Destaque 2', 'Evento Destaque 3'].map((label) => (
              <div key={label} style={{ scrollSnapAlign: 'center' }}>
                <LargeMediaCard label={label} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A843]/0 via-[#D4A843] to-[#D4A843]/0" />
    </div>
  );
}
