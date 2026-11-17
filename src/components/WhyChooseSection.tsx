import React from 'react';
import {Check, Heart} from 'lucide-react';
import {TranslationDict} from '../i18n/translations';
import {DownloadButton} from './DownloadButton';

interface WhyChooseSectionProps {
  t: TranslationDict;
  onDownloadClick: () => void;
  isDownloading: boolean;
  progress: number | null;
}

const CREATOR_CARDS = [
  {
    name: 'Ananya Verma',
    image: '/src/assets/images/creator_card_dance_1794913459003.jpg',
    tiltClass: '-rotate-6 translate-y-1 hover:rotate-0',
  },
  {
    name: 'Rohan Kapoor',
    image: '/src/assets/images/creator_card_music_1794913460130.jpg',
    tiltClass: '-rotate-2 -translate-y-1 hover:rotate-0',
  },
  {
    name: 'Meera Nair',
    image: '/src/assets/images/creator_card_stage_1794913460363.jpg',
    tiltClass: 'rotate-2 -translate-y-0.5 hover:rotate-0',
  },
  {
    name: 'Neha & Sara',
    image: '/src/assets/images/creator_card_comedy_1794913459668.jpg',
    tiltClass: 'rotate-6 translate-y-1.5 hover:rotate-0',
  },
];

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  t,
  onDownloadClick,
  isDownloading,
  progress,
}) => {
  const checklist = [
    t.whyChoose.item1,
    t.whyChoose.item2,
    t.whyChoose.item3,
    t.whyChoose.item4,
    t.whyChoose.item5,
  ];

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8">
        {/* Left Side: Heading, Pink Checkmark List, Download Karen Button */}
        <div className="lg:col-span-5">
          <h2 className="font-display text-balance text-2xl font-extrabold italic tracking-tight text-white sm:text-3xl">
            Why Choose <span className="text-[#FF1E7A]">Masti Video?</span>
          </h2>

          <ul className="mt-5 space-y-2.5">
            {checklist.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF1E7A] text-white shadow-[0_0_10px_rgba(255,30,122,0.75)]">
                  <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-neutral-100 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <DownloadButton
              label={t.hero.downloadCta}
              onClick={onDownloadClick}
              isDownloading={isDownloading}
              progress={progress}
            />
          </div>
        </div>

        {/* Right Side: Four Horizontal White-Bordered Tilted Creator Photo Cards */}
        <div className="relative lg:col-span-7">
          {/* Pink Neon Glow behind cards */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-r from-[#FF1E7A]/30 via-[#A855F7]/20 to-[#FF1E7A]/25 blur-3xl"
            aria-hidden="true"
          />

          {/* Decorative Neon Pink Outline Heart at top-right */}
          <Heart
            className="pointer-events-none absolute -top-5 right-0 z-20 hidden h-7 w-7 rotate-12 text-[#FF1E7A] drop-shadow-[0_0_10px_rgba(255,30,122,0.8)] sm:block"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2.5">
            {CREATOR_CARDS.map((card, idx) => (
              <div
                key={idx}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border-[3px] border-white/95 bg-neutral-950 shadow-[0_14px_32px_rgba(0,0,0,0.75),0_0_22px_rgba(255,30,122,0.28)] transition-all duration-300 hover:z-20 hover:-translate-y-2 ${card.tiltClass}`}
              >
                <img
                  src={card.image}
                  alt={`${card.name} creator on Masti Video`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Neon Pink Underline Swoosh beneath creator cards */}
          <div className="mt-5 flex justify-center" aria-hidden="true">
            <div className="h-1.5 w-44 rounded-full bg-gradient-to-r from-transparent via-[#FF1E7A] to-transparent shadow-[0_0_14px_rgba(255,30,122,0.85)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
