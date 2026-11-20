import React, {useState} from 'react';
import {ChevronDown, Globe, Menu, X} from 'lucide-react';
import {FlamePlayLogo} from './FlamePlayLogo';
import {LANGUAGE_OPTIONS, LanguageCode, TranslationDict} from '../i18n/translations';

interface HeaderProps {
  t: TranslationDict;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigateSection?: (hash: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  t,
  language,
  onLanguageChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    {label: t.nav.home, href: '#home', isHome: true},
    {label: t.nav.features, href: '#features', isHome: false},
    {label: t.nav.screenshots, href: '#screenshots', isHome: false},
    {label: t.nav.about, href: '#about', isHome: false},
    {label: t.nav.contact, href: '#contact', isHome: false},
  ];

  const currentLang = LANGUAGE_OPTIONS.find((l) => l.code === language) ?? LANGUAGE_OPTIONS[0];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(hash);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Flame Play Logo + Masti Video */}
        <a
          href="/#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <FlamePlayLogo size={40} withGlow />
          <span className="font-display text-2xl font-extrabold italic tracking-tight text-white">
            Masti <span className="text-[#FF1E7A]">Video</span>
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4">
          {navItems.map((item) =>
            item.isHome ? (
              <a
                key={item.href}
                href={`/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-full bg-gradient-to-r from-[#FF1E7A] via-[#EC1B79] to-[#D9167A] px-5 py-1.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,30,122,0.75)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={`/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:text-[#FF1E7A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Right: Language Selector */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-expanded={langMenuOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-100 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Globe className="h-4 w-4 text-neutral-200" aria-hidden="true" />
              <span>{currentLang.label}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-300 transition-transform duration-200 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langMenuOpen && (
              <div
                role="listbox"
                aria-label="Languages"
                className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/15 bg-neutral-950/95 p-1 shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-xl"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    role="option"
                    aria-selected={opt.code === language}
                    onClick={() => {
                      onLanguageChange(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                      opt.code === language
                        ? 'bg-pink-500/20 font-semibold text-pink-300'
                        : 'text-neutral-200 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-mono text-xs text-neutral-400">{opt.shortLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const idx = LANGUAGE_OPTIONS.findIndex((l) => l.code === language);
              const next = LANGUAGE_OPTIONS[(idx + 1) % LANGUAGE_OPTIONS.length];
              onLanguageChange(next.code);
            }}
            aria-label={`Switch language (current: ${currentLang.label})`}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 text-xs font-semibold text-neutral-100 hover:border-pink-500/50 cursor-pointer"
          >
            <Globe className="h-4 w-4 text-pink-400" aria-hidden="true" />
            <span>{currentLang.shortLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:border-pink-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-black/95 px-4 pb-5 pt-3 lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex min-h-[44px] items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  item.isHome
                    ? 'bg-gradient-to-r from-[#FF1E7A] to-[#EC4899] text-white shadow-[0_0_16px_rgba(255,30,122,0.55)]'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-pink-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
