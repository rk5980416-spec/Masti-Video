import React from 'react';
import {Clapperboard, Heart, ShieldCheck, Users, Zap} from 'lucide-react';
import {TranslationDict} from '../i18n/translations';

interface StatsAndFeaturesProps {
  t: TranslationDict;
  onJoinClick?: () => void;
}

export const StatsAndFeatures: React.FC<StatsAndFeaturesProps> = ({t}) => {
  const features = [
    {
      title: t.features.fast,
      icon: Zap,
      iconClass: 'text-[#FF2E93] fill-[#FF2E93] drop-shadow-[0_0_12px_rgba(255,46,147,0.75)]',
    },
    {
      title: t.features.short,
      icon: Clapperboard,
      iconClass: 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.65)]',
    },
    {
      title: t.features.follow,
      icon: Users,
      iconClass: 'text-violet-400 fill-violet-500/40 drop-shadow-[0_0_12px_rgba(139,92,246,0.75)]',
    },
    {
      title: t.features.interact,
      icon: Heart,
      iconClass: 'text-[#FF2E93] fill-[#FF2E93] drop-shadow-[0_0_12px_rgba(255,46,147,0.75)]',
    },
    {
      title: t.features.safe,
      icon: ShieldCheck,
      iconClass: 'text-emerald-400 fill-emerald-500/25 drop-shadow-[0_0_12px_rgba(52,211,153,0.7)]',
    },
  ];

  return (
    <section id="features" className="scroll-mt-24 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-bar overflow-hidden rounded-2xl border border-purple-400/25 shadow-[0_12px_40px_rgba(0,0,0,0.75),0_0_24px_rgba(168,85,247,0.16)]">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-white/15">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-row items-center justify-start gap-3.5 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.04] lg:flex-col lg:justify-center lg:py-5 lg:text-center"
                >
                  <Icon className={`h-7 w-7 shrink-0 ${feat.iconClass}`} aria-hidden="true" />
                  <span className="text-sm font-semibold leading-snug text-white">
                    {feat.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
