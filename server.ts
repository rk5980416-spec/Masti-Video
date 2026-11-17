import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {Readable} from 'node:stream';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

let cachedMetadata: {data: ApkMetadataResponse; expiresAt: number} | null = null;

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
  const timeout = setTimeout(() => controller.abort(), 9000);

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

    // Binary response headers arrived — read exact size & filename and abort stream immediately (0 KB downloaded)
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

async function fetchDriveBinary(fileId: string) {
  const directUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
    fileId
  )}&export=download&confirm=t`;

  const response = await fetch(directUrl, {
    method: 'GET',
    redirect: 'follow',
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
    return {ok: false as const, reason: 'PRIVATE' as const};
  }

  if (contentType.includes('text/html')) {
    const html = await response.text();
    if (html.includes('ServiceLogin') || html.includes('accounts.google.com') || html.includes('You need access')) {
      return {ok: false as const, reason: 'PRIVATE' as const};
    }

    const uuidMatch = html.match(/name="uuid"\s+value="([^"]+)"/i);
    const confirmMatch = html.match(/name="confirm"\s+value="([^"]+)"/i);
    if (uuidMatch?.[1]) {
      const confirmedUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
        fileId
      )}&export=download&confirm=${encodeURIComponent(confirmMatch?.[1] || 't')}&uuid=${encodeURIComponent(
        uuidMatch[1]
      )}`;
      const retryRes = await fetch(confirmedUrl, {redirect: 'follow'});
      if (!retryRes.ok || (retryRes.headers.get('content-type') || '').includes('text/html')) {
        return {ok: false as const, reason: 'UNAVAILABLE' as const};
      }
      return {ok: true as const, response: retryRes};
    }

    return {ok: false as const, reason: 'UNAVAILABLE' as const};
  }

  if (!response.ok || !response.body) {
    return {ok: false as const, reason: 'UNAVAILABLE' as const};
  }

  return {ok: true as const, response};
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Live APK metadata endpoint: reads real size & filename/version directly from Google Drive
  app.get('/api/apk-info', async (req, res) => {
    const forceRefresh = req.query.refresh === '1';
    const now = Date.now();
    if (!forceRefresh && cachedMetadata && cachedMetadata.expiresAt > now) {
      res.setHeader('Cache-Control', 'no-store');
      res.json(cachedMetadata.data);
      return;
    }

    const data = await inspectDriveApkMetadata(DRIVE_FILE_ID);
    cachedMetadata = {
      data,
      expiresAt: now + (data.available ? 60_000 : 10_000),
    };
    res.setHeader('Cache-Control', 'no-store');
    res.json(data);
  });

  // Direct APK proxy route: avoids opening Google Drive UI or exposing raw Drive URLs
  app.get('/api/download-apk', async (_req, res) => {
    try {
      const result = await fetchDriveBinary(DRIVE_FILE_ID);

      if (!result.ok) {
        if (result.reason === 'PRIVATE') {
          res.status(403).json({
            error: 'DRIVE_FILE_PRIVATE',
            message:
              'Google Drive APK file abhi Private/Restricted hai. Google Drive me file par Share -> General access ko "Anyone with the link" (Viewer) par set karein, phir Download Karen dabane par APK seedha download hone lagega.',
          });
          return;
        }
        res.status(502).json({
          error: 'DOWNLOAD_UNAVAILABLE',
          message: 'APK file is temporarily unavailable from storage. Please try again shortly.',
        });
        return;
      }

      const upstream = result.response;
      const contentLength = upstream.headers.get('content-length');
      const realFileName =
        parseFilenameFromDisposition(upstream.headers.get('content-disposition')) ||
        DEFAULT_APK_FILENAME;

      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${realFileName}"`);
      res.setHeader('Cache-Control', 'no-store');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      if (!upstream.body) {
        res.status(502).end();
        return;
      }

      const nodeStream = Readable.fromWeb(upstream.body as Parameters<typeof Readable.fromWeb>[0]);
      nodeStream.on('error', () => {
        if (!res.headersSent) {
          res.status(502).end();
        } else {
          res.end();
        }
      });
      nodeStream.pipe(res);
    } catch {
      if (!res.headersSent) {
        res.status(502).json({
          error: 'DOWNLOAD_FAILED',
          message: 'Could not reach APK storage server. Please try again.',
        });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Masti Video server running on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
