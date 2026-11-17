import type {IncomingMessage, ServerResponse} from 'node:http';

const DRIVE_FILE_ID = '198qpIMNbGA3eadiSuboj3P4N4c-0xxAm';
const DEFAULT_APK_FILENAME = 'MastiVideo.apk';

interface ApkMetadataResponse {
  available: boolean;
  reason?: 'PRIVATE' | 'UNAVAILABLE';
  fileName: string | null;
  versionLabel: string | null;
  sizeBytes: number | null;
  sizeLabel: string | null;
  lastModified: string | null;
  checkedAt: string;
}

function formatBytesToMb(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 100) return `${mb.toFixed(0)} MB`;
  if (mb >= 10) return `${mb.toFixed(1)} MB`;
  return `${mb.toFixed(2)} MB`;
}

function parseFilenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) return null;
  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) {
    try {
      return decodeURIComponent(utfMatch[1].trim().replace(/^["']|["']$/g, ''));
    } catch {
      return utfMatch[1].trim();
    }
  }
  const basicMatch = disposition.match(/filename="?([^";]+)"?/i);
  return basicMatch?.[1]?.trim() || null;
}

function extractVersionFromMetadata(fileName: string | null, lastModified: string | null): string | null {
  if (fileName) {
    const verMatch = fileName.match(/(?:^|[_\-\s.])v?(\d+\.\d+(?:\.\d+)?)(?=[_\-\s.]|\.apk|$)/i);
    if (verMatch?.[1]) {
      return `v${verMatch[1]}`;
    }
  }
  if (lastModified) {
    const parsedDate = new Date(lastModified);
    if (!Number.isNaN(parsedDate.getTime())) {
      return `Build ${parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}`;
    }
  }
  return null;
}

async function inspectDriveApkMetadata(fileId: string): Promise<ApkMetadataResponse> {
  const directUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
    fileId
  )}&export=download&confirm=t`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8500);

  try {
    const response = await fetch(directUrl, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      },
    });

    const finalUrl = response.url || '';
    const contentType = (response.headers.get('content-type') || '').toLowerCase();

    if (
      response.status === 401 ||
      response.status === 403 ||
      finalUrl.includes('accounts.google.com') ||
      finalUrl.includes('ServiceLogin')
    ) {
      controller.abort();
      return {
        available: false,
        reason: 'PRIVATE',
        fileName: null,
        versionLabel: null,
        sizeBytes: null,
        sizeLabel: null,
        lastModified: null,
        checkedAt: new Date().toISOString(),
      };
    }

    if (contentType.includes('text/html')) {
      const html = await response.text();
      if (
        html.includes('ServiceLogin') ||
        html.includes('accounts.google.com') ||
        html.includes('You need access')
      ) {
        return {
          available: false,
          reason: 'PRIVATE',
          fileName: null,
          versionLabel: null,
          sizeBytes: null,
          sizeLabel: null,
          lastModified: null,
          checkedAt: new Date().toISOString(),
        };
      }

      const uuidMatch = html.match(/name="uuid"\s+value="([^"]+)"/i);
      const confirmMatch = html.match(/name="confirm"\s+value="([^"]+)"/i);
      const htmlNameMatch = html.match(/class="uc-name-size"[^>]*><a[^>]*>([^<]+)<\/a>\s*\(([^)]+)\)/i);

      if (uuidMatch?.[1]) {
        const retryController = new AbortController();
        const retryTimer = setTimeout(() => retryController.abort(), 8000);
        try {
          const confirmedUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
            fileId
          )}&export=download&confirm=${encodeURIComponent(
            confirmMatch?.[1] || 't'
          )}&uuid=${encodeURIComponent(uuidMatch[1])}`;
          const retryRes = await fetch(confirmedUrl, {
            redirect: 'follow',
            signal: retryController.signal,
          });
          const retryLen = retryRes.headers.get('content-length');
          const retryDisp = parseFilenameFromDisposition(retryRes.headers.get('content-disposition'));
          const retryMod = retryRes.headers.get('last-modified');
          retryController.abort();

          const sizeBytes = retryLen ? parseInt(retryLen, 10) : null;
          const fileName = retryDisp || htmlNameMatch?.[1]?.trim() || DEFAULT_APK_FILENAME;
          return {
            available: retryRes.ok,
            fileName,
            versionLabel: extractVersionFromMetadata(fileName, retryMod),
            sizeBytes,
            sizeLabel: sizeBytes ? formatBytesToMb(sizeBytes) : htmlNameMatch?.[2]?.trim() || null,
            lastModified: retryMod,
            checkedAt: new Date().toISOString(),
          };
        } finally {
          clearTimeout(retryTimer);
        }
      }

      return {
        available: false,
        reason: 'UNAVAILABLE',
        fileName: null,
        versionLabel: null,
        sizeBytes: null,
        sizeLabel: null,
        lastModified: null,
        checkedAt: new Date().toISOString(),
      };
    }

    const contentLengthHeader = response.headers.get('content-length');
    const fileName =
      parseFilenameFromDisposition(response.headers.get('content-disposition')) ||
      DEFAULT_APK_FILENAME;
    const lastModified = response.headers.get('last-modified');
    controller.abort();

    const sizeBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : null;

    return {
      available: response.ok,
      fileName,
      versionLabel: extractVersionFromMetadata(fileName, lastModified),
      sizeBytes,
      sizeLabel: sizeBytes ? formatBytesToMb(sizeBytes) : null,
      lastModified,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return {
      available: false,
      reason: 'UNAVAILABLE',
      fileName: null,
      versionLabel: null,
      sizeBytes: null,
      sizeLabel: null,
      lastModified: null,
      checkedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const data = await inspectDriveApkMetadata(DRIVE_FILE_ID);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}
