import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Image, Video, X } from 'lucide-react';

interface MediaUploadZoneProps {
  label?: string;
  accept?: 'image' | 'video' | 'both';
  orientation?: 'horizontal' | 'vertical' | 'square';
  className?: string;
  large?: boolean;
}

export function MediaUploadZone({
  label = 'Upload mídia',
  accept = 'both',
  orientation = 'horizontal',
  className,
  large = false,
}: MediaUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  const acceptMap = {
    image: 'image/*',
    video: 'video/*',
    both: 'image/*,video/*',
  };

  const aspectMap = {
    horizontal: 'aspect-video',
    vertical: 'aspect-[9/16]',
    square: 'aspect-square',
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    setPreview({ url, type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const Icon = accept === 'video' ? Video : accept === 'image' ? Image : Upload;

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-dashed border-white/20 overflow-hidden cursor-pointer',
        'flex items-center justify-center',
        !preview && 'bg-white/5',
        aspectMap[orientation],
        large && 'min-h-[300px]',
        className
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptMap[accept]}
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <>
          {preview.type === 'image' ? (
            <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <video src={preview.url} controls className="w-full h-full object-cover" />
          )}
          <button
            onClick={(e) => { e.stopPropagation(); clear(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 text-white/40">
          <Icon className={cn('w-10 h-10', large && 'w-16 h-16')} strokeWidth={1} />
          <span className="type-caption text-white/50">{label}</span>
        </div>
      )}
    </div>
  );
}
