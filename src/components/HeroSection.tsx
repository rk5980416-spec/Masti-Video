import React from 'react';
import {Play, RefreshCw, ShieldCheck, Star, Users} from 'lucide-react';
import {STATS_CONFIG} from '../config/appConfig';
import {LiveApkInfo} from '../hooks/useApkInfo';
import {TranslationDict} from '../i18n/translations';
import {DownloadButton} from './DownloadButton';
import {FlamePlayLogo} from './FlamePlayLogo';
import {PhoneMockups} from './PhoneMockups';

interface HeroSectionProps {
  t: TranslationDict;
  apkInfo: LiveApkInfo;
  onRefreshApkInfo: () => void;
  onDownloadClick: () => void;
  isDownloading: boolean;
  progress: number | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  apkInfo,
  onRefreshApkInfo,
  onDownloadClick,
  isDownloading,
  progress,
}) => {
  const versionDisplay = apkInfo.loading
    ? 'Checking...'
    : apkInfo.available
      ? apkInfo.versionLabel || apkInfo.fileName || 'Latest Release'
      : apkInfo.reason === 'PRIVATE'
        ? 'Drive Access Restricted'
        : 'Unavailable';

  const sizeDisplay = apkInfo.loading
    ? 'Checking...'
    : apkInfo.available && apkInfo.sizeLabel
      ? apkInfo.sizeLabel
      : apkInfo.reason === 'PRIVATE'
        ? 'Set Drive Public'
        : '—';

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8">
        {/* Left Column: Centered Lockup */}
        <div className="relative flex flex-col items-center text-center lg:col-span-6">
          {/* Flame Play Logo */}
          <div className="relative mb-2 flex items-center justify-center">
            <div
              className="pointer-events-none absolute h-28 w-28 rounded-full bg-gradient-to-tr from-[#FF1E7A]/45 via-[#A855F7]/35 to-[#FF8A00]/40 blur-2xl"
              aria-hidden="true"
            />
            <FlamePlayLogo size={96} withGlow className="relative z-10" />
          </div>

          <h1
            className="font-display text-balance font-extrabold italic tracking-tight text-white"
            style={{fontSize: 'clamp(2.75rem, 5.2vw, 4.35rem)', lineHeight: 1.04}}
          >
            Masti <span className="text-[#FF1E7A] drop-shadow-[0_0_24px_rgba(255,30,122,0.5)]">Video</span>
          </h1>

          <p className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Your <span className="text-[#FF1E7A]">Videos</span>, Your World!
          </p>

          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-neutral-200 sm:text-base">
            {t.hero.description}
          </p>

          {/* Download Karen Button + Curved Hand-Drawn White Arrow */}
          <div className="relative mt-6 flex w-full items-center justify-center">
            <svg
              viewBox="0 0 80 56"
              fill="none"
              className="pointer-events-none mr-1 hidden h-12 w-16 shrink-0 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] sm:block"
              aria-hidden="true"
            >
              <path
                d="M8 10C16 28 36 38 68 38"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M56 27L70 38L55 48"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <DownloadButton
              label={t.hero.downloadCta}
              onClick={onDownloadClick}
              isDownloading={isDownloading}
              progress={progress}
            />
          </div>

          {/* Live Version & APK Size Metadata (Zero Fake Numbers) */}
          <div className="mt-4 space-y-1 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-medium text-neutral-200 sm:text-sm">
              <span>
                {t.hero.latestVersion}:{' '}
                <strong className="font-mono tabular-nums font-bold text-white">
                  {versionDisplay}
                </strong>
              </span>
              <span aria-hidden="true" className="text-white/40">
                |
              </span>
              <span>
                {t.hero.apkSize}:{' '}
                <strong className="font-mono tabular-nums font-bold text-white">
                  {sizeDisplay}
                </strong>
              </span>
              {!apkInfo.loading && !apkInfo.available && (
                <button
                  type="button"
                  onClick={onRefreshApkInfo}
                  aria-label="Refresh APK version and size"
                  title="Re-check live APK version and size"
                  className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] text-pink-300 hover:bg-white/10 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" aria-hidden="true" />
                  <span>Sync</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <span>{t.hero.directDownload}</span>
              <span aria-hidden="true" className="text-white/40">
                •
              </span>
              <span>{t.hero.secureDownload}</span>
            </div>
          </div>

          {/* 3-Column Statistics Strip */}
          <div
            aria-label="Community Statistics"
            className="mt-6 grid w-full max-w-lg grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/10 bg-black/50 py-3.5 backdrop-blur-md"
          >
            <div className="flex flex-col items-center px-2">
              <Users className="mb-1 h-5 w-5 text-amber-400" aria-hidden="true" />
              <span className="font-display tabular-nums text-xl font-extrabold text-white sm:text-2xl">
                {STATS_CONFIG.happyUsersValue}
              </span>
              <span className="text-[11px] font-medium text-neutral-300 sm:text-xs">
                {t.stats.happyUsers}
              </span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF1E7A] to-[#FF6B35] text-white">
                <Play className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true" />
              </span>
              <span className="font-display tabular-nums text-xl font-extrabold text-white sm:text-2xl">
                {STATS_CONFIG.videosValue}
              </span>
              <span className="text-[11px] font-medium text-neutral-300 sm:text-xs">
                {t.stats.videos}
              </span>
            </div>

            <button
              type="button"
              onClick={onDownloadClick}
              className="group flex flex-col items-center px-2 transition-opacity hover:opacity-90 cursor-pointer"
            >
              <Star className="mb-1 h-5 w-5 fill-[#FF1E7A] text-[#FF1E7A] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              <span className="font-display text-lg font-extrabold text-white sm:text-xl">
                Join Now
              </span>
              <span className="text-[11px] font-medium text-neutral-300 sm:text-xs">
                Be a Star
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Tilted Dual Smartphone Mockups */}
        <div id="screenshots" className="scroll-mt-24 lg:col-span-6">
          <PhoneMockups />
        </div>
      </div>
    </section>
  );
};
