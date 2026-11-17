/**
 * ============================================================================
 * MASTI VIDEO - CENTRAL APK & APP CONFIGURATION
 * ============================================================================
 * APK version and file size are fetched live from /api/apk-info so whenever
 * you upload a new APK version to Google Drive, the website updates
 * automatically without fake/hardcoded numbers.
 */
export const APK_CONFIG = {
  APK_DOWNLOAD_URL: '/api/download-apk',
  APK_INFO_URL: '/api/apk-info',
  FALLBACK_FILE_NAME: 'MastiVideo.apk',
  MIN_ANDROID_VERSION: 'Android 7.0+',
} as const;

/**
 * Editable community counters displayed in the Statistics section.
 */
export const STATS_CONFIG = {
  happyUsersValue: '1M+',
  happyUsersLabelKey: 'stats.happyUsers' as const,
  videosValue: '10M+',
  videosLabelKey: 'stats.videos' as const,
};

/**
 * Official social & support links shown in the Footer and Contact section.
 */
export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  telegram: 'https://t.me',
  supportEmail: 'support@mastivideo.in',
} as const;
