import {useCallback, useState} from 'react';
import {APK_CONFIG} from '../config/appConfig';
import {LiveApkInfo} from './useApkInfo';

export type ApkDownloadStatus =
  | 'idle'
  | 'downloading'
  | 'completed'
  | 'browser-started'
  | 'unconfigured'
  | 'error';

export interface ApkDownloadState {
  status: ApkDownloadStatus;
  progress: number | null;
  message: string;
}

function isValidConfiguredUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function parseFilenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) return null;
  const match = disposition.match(/filename="?([^";]+)"?/i);
  return match?.[1]?.trim() || null;
}

function triggerAnchorDownload(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function useApkDownload(apkInfo: LiveApkInfo) {
  const [downloadState, setDownloadState] = useState<ApkDownloadState>({
    status: 'idle',
    progress: null,
    message: '',
  });

  const resetDownloadState = useCallback(() => {
    setDownloadState({status: 'idle', progress: null, message: ''});
  }, []);

  const startDownload = useCallback(async () => {
    const url = APK_CONFIG.APK_DOWNLOAD_URL.trim();
    const initialFileName = apkInfo.fileName || APK_CONFIG.FALLBACK_FILE_NAME;

    if (!isValidConfiguredUrl(url)) {
      setDownloadState({
        status: 'unconfigured',
        progress: null,
        message: 'Direct APK download is not configured yet.',
      });
      return;
    }

    setDownloadState({
      status: 'downloading',
      progress: 0,
      message: apkInfo.sizeLabel
        ? `Downloading ${initialFileName} (${apkInfo.sizeLabel})...`
        : `Downloading ${initialFileName}...`,
    });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        let serverMessage = `Download could not start (status ${response.status}).`;
        try {
          const errJson = (await response.json()) as {message?: string};
          if (errJson?.message) {
            serverMessage = errJson.message;
          }
        } catch {
          // ignore non-JSON body
        }
        setDownloadState({
          status: 'error',
          progress: null,
          message: serverMessage,
        });
        return;
      }

      const resolvedFileName =
        parseFilenameFromDisposition(response.headers.get('content-disposition')) ||
        initialFileName;
      const contentLengthHeader = response.headers.get('content-length');
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;

      if (!response.body) {
        triggerAnchorDownload(url, resolvedFileName);
        setDownloadState({
          status: 'browser-started',
          progress: 100,
          message: `Download started for ${resolvedFileName}. Check your browser downloads.`,
        });
        return;
      }

      const reader = response.body.getReader();
      const chunks: BlobPart[] = [];
      let receivedBytes = 0;

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedBytes += value.length;
          if (totalBytes > 0) {
            const pct = Math.min(99, Math.round((receivedBytes / totalBytes) * 100));
            setDownloadState({
              status: 'downloading',
              progress: pct,
              message: `Downloading ${resolvedFileName} (${pct}%)`,
            });
          } else {
            setDownloadState({
              status: 'downloading',
              progress: null,
              message: `Downloading ${resolvedFileName}...`,
            });
          }
        }
      }

      const blob = new Blob(chunks, {type: 'application/vnd.android.package-archive'});
      const blobUrl = URL.createObjectURL(blob);
      triggerAnchorDownload(blobUrl, resolvedFileName);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);

      const finalMb = (receivedBytes / (1024 * 1024)).toFixed(1);
      setDownloadState({
        status: 'completed',
        progress: 100,
        message: `${resolvedFileName} (${finalMb} MB) downloaded! Tap to install on Android.`,
      });
    } catch {
      setDownloadState({
        status: 'error',
        progress: null,
        message: 'Could not download the APK right now. Please check your internet connection and try again.',
      });
    }
  }, [apkInfo.fileName, apkInfo.sizeLabel]);

  return {
    downloadState,
    startDownload,
    resetDownloadState,
  };
}
