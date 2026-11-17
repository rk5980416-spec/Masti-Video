import {useCallback, useEffect, useState} from 'react';
import {APK_CONFIG} from '../config/appConfig';

export interface LiveApkInfo {
  loading: boolean;
  available: boolean;
  reason?: 'PRIVATE' | 'UNAVAILABLE';
  fileName: string | null;
  versionLabel: string | null;
  sizeBytes: number | null;
  sizeLabel: string | null;
  lastModified: string | null;
}

export function useApkInfo() {
  const [apkInfo, setApkInfo] = useState<LiveApkInfo>({
    loading: true,
    available: false,
    fileName: null,
    versionLabel: null,
    sizeBytes: null,
    sizeLabel: null,
    lastModified: null,
  });

  const fetchInfo = useCallback(async (forceRefresh = false) => {
    try {
      const endpoint = forceRefresh
        ? `${APK_CONFIG.APK_INFO_URL}?refresh=1`
        : APK_CONFIG.APK_INFO_URL;
      const res = await fetch(endpoint, {cache: 'no-store'});
      if (!res.ok) throw new Error('Failed to fetch APK info');
      const data = (await res.json()) as Omit<LiveApkInfo, 'loading'>;
      setApkInfo({
        loading: false,
        available: !!data.available,
        reason: data.reason,
        fileName: data.fileName ?? null,
        versionLabel: data.versionLabel ?? null,
        sizeBytes: data.sizeBytes ?? null,
        sizeLabel: data.sizeLabel ?? null,
        lastModified: data.lastModified ?? null,
      });
    } catch {
      setApkInfo((prev) => ({
        ...prev,
        loading: false,
        available: false,
        reason: 'UNAVAILABLE',
      }));
    }
  }, []);

  useEffect(() => {
    void fetchInfo(false);
  }, [fetchInfo]);

  return {
    apkInfo,
    refreshApkInfo: () => fetchInfo(true),
  };
}
