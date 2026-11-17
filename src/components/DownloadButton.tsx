import React from 'react';
import {Download, Loader2} from 'lucide-react';
import {AndroidIcon} from './FlamePlayLogo';

interface DownloadButtonProps {
  label: string;
  onClick: () => void;
  isDownloading?: boolean;
  progress?: number | null;
  fullWidthMobile?: boolean;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  label,
  onClick,
  isDownloading = false,
  progress = null,
  fullWidthMobile = true,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDownloading}
      className={`group relative inline-flex items-center justify-center gap-3.5 rounded-full border-2 border-[#FF2E93] bg-gradient-to-r from-[#580834]/95 via-[#9A0E58]/95 to-[#6E0D4A]/95 px-8 py-3.5 text-lg font-extrabold tracking-tight text-white shadow-[0_0_24px_rgba(255,30,122,0.75),inset_0_0_16px_rgba(255,46,147,0.35)] animate-neon-pulse transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-80 cursor-pointer whitespace-nowrap shrink-0 ${
        fullWidthMobile ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-black/20"
        aria-hidden="true"
      />
      <AndroidIcon className="relative z-10 h-7 w-7 shrink-0 text-[#8CE01D] drop-shadow-[0_0_8px_rgba(140,224,29,0.55)] transition-transform duration-200 group-hover:scale-110" />
      <span className="relative z-10 text-white">
        {isDownloading
          ? progress !== null
            ? `Downloading ${progress}%`
            : 'Downloading...'
          : label}
      </span>
      {isDownloading ? (
        <Loader2 className="relative z-10 h-6 w-6 shrink-0 animate-spin text-white" aria-hidden="true" />
      ) : (
        <Download
          className="relative z-10 h-6 w-6 shrink-0 stroke-[2.5] text-white transition-transform duration-200 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </button>
  );
};
