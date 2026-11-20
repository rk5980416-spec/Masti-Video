import React, {useEffect} from 'react';
import {AlertCircle, CheckCircle2, Download, X} from 'lucide-react';
import {APK_CONFIG} from '../config/appConfig';
import {ApkDownloadState} from '../hooks/useApkDownload';
import {LiveApkInfo} from '../hooks/useApkInfo';
import {FlamePlayLogo} from './FlamePlayLogo';

export type ModalType = 'privacy' | 'terms' | 'download-status' | null;

interface InfoModalProps {
  modalType: ModalType;
  apkInfo: LiveApkInfo;
  downloadState: ApkDownloadState;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  modalType,
  apkInfo,
  downloadState,
  onClose,
}) => {
  useEffect(() => {
    if (!modalType) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalType, onClose]);

  if (!modalType) return null;

  const metaParts = [
    apkInfo.available ? apkInfo.versionLabel : null,
    apkInfo.available ? apkInfo.sizeLabel : null,
    APK_CONFIG.MIN_ANDROID_VERSION,
  ].filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-pink-500/35 bg-neutral-950 p-6 shadow-[0_0_50px_rgba(255,30,122,0.28)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/15 hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {modalType === 'download-status' && (
          <div>
            <div className="flex items-center gap-3">
              <FlamePlayLogo size={36} withGlow />
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Masti Video Android APK
                </h3>
                <p className="font-mono tabular-nums text-xs text-neutral-400">
                  {metaParts.join(' · ')}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              {downloadState.status === 'unconfigured' && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                  <div className="space-y-1.5 text-sm text-neutral-200">
                    <p className="font-semibold text-white">APK Download Not Ready</p>
                    <p className="text-neutral-300">{downloadState.message}</p>
                  </div>
                </div>
              )}

              {downloadState.status === 'downloading' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{downloadState.message}</span>
                    {downloadState.progress !== null && (
                      <span className="font-mono tabular-nums text-pink-400">
                        {downloadState.progress}%
                      </span>
                    )}
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF1E7A] to-[#A855F7] transition-all duration-150"
                      style={{width: `${downloadState.progress ?? 45}%`}}
                    />
                  </div>
                </div>
              )}

              {(downloadState.status === 'completed' ||
                downloadState.status === 'browser-started') && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                  <div className="space-y-1.5 text-sm">
                    <p className="font-semibold text-white">Download Started</p>
                    <p className="text-neutral-300">{downloadState.message}</p>
                  </div>
                </div>
              )}

              {downloadState.status === 'error' && (
                <div className="flex items-start gap-3">
                  <Download className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-neutral-200">{downloadState.message}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-gradient-to-r from-[#FF1E7A] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {modalType === 'privacy' && (
          <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
            <h3 className="font-display text-2xl font-bold text-white">Privacy Policy</h3>
            <p>
              Masti Video values your privacy. We collect only the minimum account and media
              information required to deliver your short-video feed, creator profile, and social
              interactions.
            </p>
            <p>
              Direct APK downloads initiated from this website do not track device identifiers.
              Uploaded videos, comments, and profile preferences remain under your account privacy
              controls inside the Android app.
            </p>
            <p>
              For data access or account deletion requests, email{' '}
              <span className="text-pink-400">mastivideoindiak@gmail.com</span>.
            </p>
          </div>
        )}

        {modalType === 'terms' && (
          <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
            <h3 className="font-display text-2xl font-bold text-white">Terms & Conditions</h3>
            <p>
              By downloading and installing Masti Video on Android, you agree to use the platform
              respectfully and only upload short-video content that you own or have permission to
              share.
            </p>
            <p>
              Harassment, copyright infringement, or harmful content is strictly prohibited and
              subject to removal under our community safety guidelines.
            </p>
            <p>
              Always install Masti Video exclusively from our official download link to ensure
              package integrity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
