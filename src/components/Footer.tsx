import React from 'react';
import {SOCIAL_LINKS} from '../config/appConfig';
import {TranslationDict} from '../i18n/translations';
import {FlamePlayLogo} from './FlamePlayLogo';

interface FooterProps {
  t: TranslationDict;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onNavigateSection?: (hash: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  onOpenPrivacy,
  onOpenTerms,
  onNavigateSection,
}) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(hash);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-black py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          {/* Left: Masti Video Logo */}
          <a
            href="/#home"
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <FlamePlayLogo size={34} withGlow />
            <span className="font-display text-lg font-extrabold italic tracking-tight text-white">
              Masti <span className="text-[#FF1E7A]">Video</span>
            </span>
          </a>

          {/* Center: Pipe-separated Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-neutral-200 sm:text-sm"
          >
            <a
              href="/#about"
              onClick={(e) => handleAnchorClick(e, '#about')}
              className="hover:text-[#FF1E7A] transition-colors"
            >
              {t.footer.about}
            </a>
            <span aria-hidden="true" className="text-white/25">|</span>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onOpenPrivacy();
              }}
              className="hover:text-[#FF1E7A] transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </a>
            <span aria-hidden="true" className="text-white/25">|</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#FF1E7A] transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true" className="text-white/25">|</span>
            <a
              href="/#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="hover:text-[#FF1E7A] transition-colors"
            >
              {t.footer.contact}
            </a>
          </nav>

          {/* Right: Follow Us + Authentic Colored Social Icons */}
          <div className="flex items-center gap-2.5">
            <span className="mr-1 text-xs font-bold text-white sm:text-sm">Follow Us:</span>

            {/* YouTube (Red) */}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masti Video on YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Facebook (Blue Circle) */}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masti Video on Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>

            {/* Instagram (Gradient) */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masti Video on Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Telegram (Sky Blue Circle) */}
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masti Video on Telegram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#229ED9] text-white transition-transform duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
