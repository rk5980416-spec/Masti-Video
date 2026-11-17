import React, {useEffect, useRef, useState} from 'react';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Clapperboard,
  Crown,
  Gift,
  Heart,
  Home,
  Info,
  Lock,
  MessageCircle,
  Music2,
  Plus,
  Search,
  Share2,
  User,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';

const PROFILE_GALLERY = [
  '/src/assets/images/creator_card_dance_1794913459003.jpg',
  '/src/assets/images/creator_card_stage_1794913460363.jpg',
  '/src/assets/images/creator_card_music_1794913460130.jpg',
  '/src/assets/images/creator_card_comedy_1794913459668.jpg',
  '/src/assets/images/feed_creator_dance_1794913458375.jpg',
  '/src/assets/images/creator_card_dance_1794913459003.jpg',
];

export const PhoneMockups: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const userExplicitlyMutedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [phone2Tab, setPhone2Tab] = useState<'monetize' | 'profile'>('monetize');
  const [profileShared, setProfileShared] = useState(false);

  // Auto-play muted on mount, and unmute the video's music track on first click/tap anywhere
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleFirstInteraction = () => {
      if (userExplicitlyMutedRef.current) return;
      const vid = videoRef.current;
      if (!vid) return;
      vid.muted = false;
      vid.volume = 1;
      vid
        .play()
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {});
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, {passive: true});
    window.addEventListener('keydown', handleFirstInteraction, {passive: true});

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    userExplicitlyMutedRef.current = nextMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
    setIsMuted(nextMuted);
  };

  const handleShareProfile = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setProfileShared(true);
    setTimeout(() => setProfileShared(false), 2000);
  };

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center py-2">
      {/* Ambient Neon Pink & Purple Glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FF1E7A]/35 via-[#8B5CF6]/25 to-[#FF6B35]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Music Control Pill above phones */}
      <div className="relative z-30 mb-3 flex items-center justify-center rounded-full border border-white/15 bg-black/80 px-3 py-1.5 backdrop-blur-xl shadow-[0_0_24px_rgba(255,30,122,0.22)]">
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Unmute video music' : 'Mute video music'}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold transition-colors cursor-pointer ${
            !isMuted
              ? 'bg-pink-500/25 text-pink-200'
              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
          }`}
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5 text-neutral-300" aria-hidden="true" />
          ) : (
            <Volume2 className="h-3.5 w-3.5 text-[#FF2E93]" aria-hidden="true" />
          )}
          <span>{isMuted ? 'Tap for Music' : 'Music On'}</span>
        </button>
      </div>

      {/* Floating 3D Pink Hearts */}
      <div
        className="pointer-events-none absolute left-2 top-14 z-30 hidden sm:flex items-start gap-2"
        aria-hidden="true"
      >
        <Heart className="h-9 w-9 -rotate-12 fill-[#FF2E93] text-[#FF2E93] drop-shadow-[0_0_14px_rgba(255,46,147,0.8)]" />
        <Heart className="mt-5 h-6 w-6 rotate-12 fill-[#FF1E7A] text-[#FF1E7A] drop-shadow-[0_0_12px_rgba(255,30,122,0.75)]" />
      </div>

      {/* Gold Crown Doodle */}
      <svg
        viewBox="0 0 64 48"
        fill="none"
        className="pointer-events-none absolute right-2 top-10 z-30 hidden h-10 w-12 rotate-12 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.75)] sm:block"
        aria-hidden="true"
      >
        <path
          d="M8 36L4 12L20 24L32 8L44 24L60 12L56 36H8Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M10 42H54" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      <div className="relative flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:gap-0">
        {/* ==================== PHONE 1: AUTO-PLAYING 60s VIDEO + NON-CLICKABLE HOME FRAME ==================== */}
        <div className="relative z-20 w-[268px] sm:w-[262px] xl:w-[280px] rotate-[2deg] sm:rotate-[4deg] transition-transform duration-300 hover:rotate-0">
          <div className="rounded-[38px] border-[3px] border-pink-200/50 bg-gradient-to-b from-neutral-800 via-neutral-950 to-neutral-900 p-2 shadow-[0_24px_70px_rgba(255,30,122,0.42),0_0_24px_rgba(168,85,247,0.3)]">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[30px] bg-black select-none">
              {/* Auto-Playing 60-Second Video (Pure Video Only, No Monetize Screen Inside) */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              >
                <source src="/assets/masti-video-60s.mp4" type="video/mp4" />
                <source src="/assets/masti-promo.mp4" type="video/mp4" />
              </video>

              {/* Top & Bottom Scrims */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 22%, rgba(0,0,0,0.08) 68%, rgba(0,0,0,0.82) 89%, #000000 100%)',
                }}
              />

              {/* NON-CLICKABLE PINNED HOME SCREEN FRAME (Strictly Display Only) */}
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
                {/* TOP BAR: Logo + Masti Video India Entertainment + Search + Following/For You */}
                <div className="px-3 pt-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <img
                        src="/assets/masti-logo.png"
                        alt="Masti Video"
                        className="h-7 w-7 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(255,60,0,0.6)]"
                      />
                      <div className="leading-none text-left">
                        <div className="font-display text-[15px] font-extrabold italic tracking-tight text-white drop-shadow">
                          Masti <span className="text-[#FACC15]">Video</span>
                        </div>
                        <div className="text-[8.5px] font-semibold italic text-white/95">
                          India Entertainment
                        </div>
                        <div className="mt-0.5 h-[1.5px] w-20 rounded-full bg-gradient-to-r from-amber-400 to-transparent" />
                      </div>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center text-white">
                      <Search className="h-4 w-4 stroke-[2.2]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Following | For You */}
                  <div className="mt-2 flex items-center justify-center gap-5 text-[12px] font-bold">
                    <span className="pb-1 text-white/80">Following</span>
                    <span className="relative pb-1 text-white">
                      For You
                      <span className="absolute inset-x-1 bottom-0 h-[2.5px] rounded-full bg-[#FF1E7A]" />
                    </span>
                  </div>
                </div>

                {/* MIDDLE + BOTTOM STATIC UI */}
                <div className="relative flex flex-col">
                  {/* Right Action Rail (Avatar+, Like 125.6K, Comment 3.2K, Bookmark 28.7K, Share 6.1K, Music Disc) */}
                  <div className="absolute bottom-14 right-2.5 flex flex-col items-center gap-2.5">
                    <div className="relative mb-1">
                      <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow">
                        <img
                          src="/assets/rajkali-avatar.jpg"
                          alt="@rajkali22"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-1.5 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[#FF1E7A] text-white shadow">
                        <Plus className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <Heart className="h-6 w-6 fill-white text-white" aria-hidden="true" />
                      <span className="tabular-nums text-[9.5px] font-bold drop-shadow">125.6K</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <MessageCircle className="h-6 w-6 fill-white text-white" aria-hidden="true" />
                      <span className="tabular-nums text-[9.5px] font-bold drop-shadow">3.2K</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <Bookmark className="h-6 w-6 fill-white text-white" aria-hidden="true" />
                      <span className="tabular-nums text-[9.5px] font-bold drop-shadow">28.7K</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <Share2 className="h-5 w-5 fill-white text-white" aria-hidden="true" />
                      <span className="tabular-nums text-[9.5px] font-bold drop-shadow">6.1K</span>
                    </div>

                    <div className="animate-disc-spin mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-neutral-900 shadow">
                      <Music2 className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Bottom-Left Handle, Follow Pill, Hashtags, Sound Pill */}
                  <div className="mb-2.5 pl-3 pr-14 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-extrabold text-white drop-shadow">
                        @rajkali22
                      </span>
                      <span className="rounded-md border border-white/80 bg-black/25 px-2 py-0.5 text-[10px] font-bold text-white">
                        Follow
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10.5px] font-medium text-white drop-shadow">
                      Masti Video ❤️
                    </p>
                    <p className="text-[10px] font-medium text-white/95 drop-shadow">
                      #trending #viral #dance #india
                    </p>
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[9.5px] font-medium text-white backdrop-blur-sm">
                      <Music2 className="h-3 w-3 shrink-0 text-white" aria-hidden="true" />
                      <span>Original Sound - Masti Video</span>
                    </div>
                  </div>

                  {/* PINNED BOTTOM NAVIGATION BAR (Static Display Only) */}
                  <div className="flex h-12 items-center justify-around border-t border-white/10 bg-black px-1.5 text-[9px] font-semibold text-neutral-300">
                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <Home className="h-4 w-4 fill-white text-white" aria-hidden="true" />
                      <span>Home</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      <span>Friends</span>
                    </div>

                    <div className="flex h-7 w-10 items-center justify-center rounded-lg border-x-[3px] border-l-cyan-400 border-r-[#FF1E7A] bg-white text-black shadow">
                      <Plus className="h-4 w-4 stroke-[2.8]" aria-hidden="true" />
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                      <div className="relative">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span className="absolute -right-2 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#FF1E7A] px-0.5 text-[8px] font-bold text-white">
                          12
                        </span>
                      </div>
                      <span>Inbox</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span>Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PHONE 2: MONETIZATION SCREEN + PROFILE TAB ==================== */}
        <div className="relative z-10 w-[240px] sm:-ml-10 sm:mt-8 sm:w-[236px] xl:w-[252px] rotate-[4deg] sm:rotate-[9deg] transition-transform duration-300 hover:z-30 hover:rotate-0">
          <div className="rounded-[36px] border-[3px] border-pink-200/35 bg-gradient-to-b from-neutral-800 via-neutral-950 to-neutral-900 p-2 shadow-[0_24px_70px_rgba(139,92,246,0.34)]">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] bg-black px-3 pt-7 pb-2 text-left">
              <div className="absolute inset-x-0 top-2 flex items-center justify-between px-4 text-[10px] font-semibold text-white">
                <span>1:04</span>
                <div className="h-3.5 w-14 rounded-full bg-black" />
                <span className="inline-block h-2 w-3 rounded-[2px] border border-white/80 bg-white/80" />
              </div>

              <div className="flex items-center justify-between">
                <ArrowLeft className="h-3.5 w-3.5 text-white/85" aria-hidden="true" />
                <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5 text-[9px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setPhone2Tab('monetize')}
                    className={`rounded-full px-2 py-0.5 cursor-pointer ${
                      phone2Tab === 'monetize' ? 'bg-[#FF1E7A] text-white' : 'text-neutral-300'
                    }`}
                  >
                    Monetize
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhone2Tab('profile')}
                    className={`rounded-full px-2 py-0.5 cursor-pointer ${
                      phone2Tab === 'profile' ? 'bg-[#FF1E7A] text-white' : 'text-neutral-300'
                    }`}
                  >
                    Profile
                  </button>
                </div>
                <Info className="h-3.5 w-3.5 text-white/85" aria-hidden="true" />
              </div>

              {phone2Tab === 'monetize' ? (
                <div className="mt-2.5 space-y-2 text-white">
                  <div className="text-center text-xs font-bold tracking-tight">Monetization</div>

                  <div className="pt-0.5">
                    <div className="text-[11px] font-bold">Earnings</div>
                    <div className="mt-1 text-[9.5px] text-neutral-400">Total balance</div>
                    <div className="font-display tabular-nums text-2xl font-extrabold text-white">
                      ₹0.00
                    </div>
                    <div className="text-[9px] text-neutral-400">Next payout • --</div>
                  </div>

                  <div className="border-y border-white/10 py-1.5">
                    <div className="flex items-center justify-between text-[10.5px] font-bold">
                      <span>Payouts</span>
                      <span className="flex items-center gap-1 font-normal text-neutral-300">
                        ₹0.00 <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="text-[9px] text-neutral-400">Inactive</div>
                  </div>

                  <div>
                    <div className="mb-1.5 text-[11px] font-bold">Ways you can earn</div>
                    <div className="space-y-2">
                      {[
                        {
                          icon: Clapperboard,
                          title: 'Reel Play Rewards',
                          desc: 'Earn money based on the views your reels get.',
                        },
                        {
                          icon: Gift,
                          title: 'Gifts',
                          desc: 'Receive gifts from your fans.',
                        },
                        {
                          icon: Crown,
                          title: 'Subscriptions',
                          desc: 'Earn recurring income from fans who subscribe.',
                        },
                        {
                          icon: Award,
                          title: 'Badges',
                          desc: 'Earn money when your fans send you badges on live.',
                        },
                      ].map((row, idx) => {
                        const Icon = row.icon;
                        return (
                          <div key={idx} className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2">
                              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                              <div>
                                <div className="text-[9.5px] font-bold leading-tight text-white">
                                  {row.title}
                                </div>
                                <div className="text-[8px] leading-tight text-neutral-400">
                                  {row.desc}
                                </div>
                              </div>
                            </div>
                            <Lock className="mt-1 h-2.5 w-2.5 shrink-0 text-neutral-400" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-2 flex flex-col items-center text-center">
                    <div className="rounded-full bg-gradient-to-tr from-[#FF1E7A] via-[#A855F7] to-[#FF8A00] p-0.5">
                      <img
                        src="/src/assets/images/creator_card_music_1794913460130.jpg"
                        alt="Masti Star profile photo"
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="text-xs font-bold text-white">Masti Star</span>
                      <BadgeCheck className="h-3.5 w-3.5 fill-sky-400 text-black" aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-neutral-400">@mastistar</p>

                    <div className="mt-2 grid w-full grid-cols-2 gap-1 py-1 text-center">
                      <div className="border-r border-white/15">
                        <div className="tabular-nums text-xs font-bold text-white">1.2M</div>
                        <div className="text-[9px] text-neutral-400">Followers</div>
                      </div>
                      <div>
                        <div className="tabular-nums text-xs font-bold text-white">0</div>
                        <div className="text-[9px] text-neutral-400">Following</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleShareProfile}
                      className="mt-1 w-4/5 rounded-lg border border-white/15 bg-white/10 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-pink-500/30 cursor-pointer"
                    >
                      {profileShared ? 'Link Copied!' : 'Share Profile'}
                    </button>

                    <p className="mt-1.5 text-[10px] text-neutral-200">Dream Big... ✨❤️</p>
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-1">
                    {PROFILE_GALLERY.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[3/4] overflow-hidden rounded-md bg-neutral-900"
                      >
                        <img
                          src={img}
                          alt={`Masti Star video ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
