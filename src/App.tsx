import {useEffect, useState} from 'react';
import {CheckCircle2, X} from 'lucide-react';
import {AboutAndContact} from './components/AboutAndContact';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {InfoModal, ModalType} from './components/InfoModal';
import {StatsAndFeatures} from './components/StatsAndFeatures';
import {WhyChooseSection} from './components/WhyChooseSection';
import {useApkDownload} from './hooks/useApkDownload';
import {useApkInfo} from './hooks/useApkInfo';
import {LanguageCode, TRANSLATIONS} from './i18n/translations';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const {apkInfo, refreshApkInfo} = useApkInfo();
  const {downloadState, startDownload, resetDownloadState} = useApkDownload(apkInfo);

  const t = TRANSLATIONS[language];

  const handleDownloadClick = () => {
    void startDownload();
  };

  useEffect(() => {
    if (downloadState.status === 'unconfigured' || downloadState.status === 'error') {
      setActiveModal('download-status');
      return;
    }
    if (
      downloadState.status === 'browser-started' ||
      downloadState.status === 'completed'
    ) {
      setToastVisible(true);
      const timer = window.setTimeout(() => {
        setToastVisible(false);
      }, 8000);
      return () => window.clearTimeout(timer);
    }
  }, [downloadState.status]);

  const handleCloseModal = () => {
    setActiveModal(null);
    if (downloadState.status !== 'downloading') {
      resetDownloadState();
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* Sweeping Neon Background Light Waves */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-0 top-12 h-64 w-64 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#FF1E7A 1.5px, transparent 1.5px)',
            backgroundSize: '12px 12px',
            maskImage: 'radial-gradient(circle at top left, black 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at top left, black 10%, transparent 70%)',
          }}
        />
        <div className="animate-ambient-float absolute -left-40 top-24 h-[340px] w-[780px] -rotate-12 rounded-full bg-gradient-to-r from-[#FF4500]/28 via-[#FF1E7A]/26 to-[#8B5CF6]/20 blur-[110px]" />
        <div
          className="animate-ambient-float absolute right-[-80px] top-16 h-[520px] w-[560px] rounded-full bg-gradient-to-bl from-[#8B5CF6]/28 via-[#FF1E7A]/22 to-transparent blur-[130px]"
          style={{animationDelay: '2.5s'}}
        />
        <div
          className="animate-ambient-float absolute bottom-[-90px] right-[12%] h-[360px] w-[520px] rounded-full bg-gradient-to-tr from-[#FF1E7A]/25 via-[#A855F7]/20 to-transparent blur-[120px]"
          style={{animationDelay: '5s'}}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header t={t} language={language} onLanguageChange={setLanguage} />

        <main className="flex-1">
          <HeroSection
            t={t}
            apkInfo={apkInfo}
            onRefreshApkInfo={() => {
              void refreshApkInfo();
            }}
            onDownloadClick={handleDownloadClick}
            isDownloading={downloadState.status === 'downloading'}
            progress={downloadState.progress}
          />

          <StatsAndFeatures t={t} onJoinClick={handleDownloadClick} />

          <WhyChooseSection
            t={t}
            onDownloadClick={handleDownloadClick}
            isDownloading={downloadState.status === 'downloading'}
            progress={downloadState.progress}
          />

          <AboutAndContact t={t} />
        </main>

        <Footer
          t={t}
          onOpenPrivacy={() => setActiveModal('privacy')}
          onOpenTerms={() => setActiveModal('terms')}
        />
      </div>

      {/* Subtle Download Started Toast (No URL shown) */}
      {toastVisible && downloadState.message && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex w-[92%] max-w-md -translate-x-1/2 items-start justify-between gap-3 rounded-2xl border border-pink-500/45 bg-neutral-950/95 px-4 py-3 text-xs text-white shadow-[0_12px_36px_rgba(255,30,122,0.35)] backdrop-blur-xl sm:text-sm"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-medium text-white">{downloadState.message}</p>
              <p className="text-[11px] leading-snug text-neutral-300">
                {language === 'en'
                  ? 'Note: If Chrome asks "File might be harmful", tap "Download anyway" — this is normal for all direct Android APKs outside Play Store.'
                  : 'Note: Agar Chrome "File might be harmful" dikhaye, toh "Download anyway" par tap karein — yeh Play Store ke bahar har APK ke liye normal warning hoti hai.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastVisible(false)}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <InfoModal
        modalType={activeModal}
        apkInfo={apkInfo}
        downloadState={downloadState}
        onClose={handleCloseModal}
      />
    </div>
  );
}
