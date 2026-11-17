import type {IncomingMessage, ServerResponse} from 'node:http';

const DRIVE_FILE_ID = '198qpIMNbGA3eadiSuboj3P4N4c-0xxAm';

async function resolveConfirmedDriveUrl(fileId: string) {
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
      return {ok: false as const, reason: 'PRIVATE' as const};
    }

    if (contentType.includes('text/html')) {
      const html = await response.text();
      if (
        html.includes('ServiceLogin') ||
        html.includes('accounts.google.com') ||
        html.includes('You need access')
      ) {
        return {ok: false as const, reason: 'PRIVATE' as const};
      }

      const uuidMatch = html.match(/name="uuid"\s+value="([^"]+)"/i);
      const confirmMatch = html.match(/name="confirm"\s+value="([^"]+)"/i);
      if (uuidMatch?.[1]) {
        const confirmedUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
          fileId
        )}&export=download&confirm=${encodeURIComponent(
          confirmMatch?.[1] || 't'
        )}&uuid=${encodeURIComponent(uuidMatch[1])}`;
        return {ok: true as const, downloadUrl: confirmedUrl};
      }

      return {ok: false as const, reason: 'UNAVAILABLE' as const};
    }

    controller.abort();

    if (!response.ok) {
      return {ok: false as const, reason: 'UNAVAILABLE' as const};
    }

    return {ok: true as const, downloadUrl: directUrl};
  } catch {
    return {ok: false as const, reason: 'UNAVAILABLE' as const};
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const result = await resolveConfirmedDriveUrl(DRIVE_FILE_ID);

  if (!result.ok) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    if (result.reason === 'PRIVATE') {
      res.statusCode = 403;
      res.end(
        JSON.stringify({
          error: 'DRIVE_FILE_PRIVATE',
          message:
            'Google Drive APK file abhi Private/Restricted hai. Google Drive me Share -> "Anyone with the link" (Viewer) par set karein.',
        })
      );
      return;
    }

    res.statusCode = 502;
    res.end(
      JSON.stringify({
        error: 'DOWNLOAD_UNAVAILABLE',
        message: 'APK file is temporarily unavailable from storage. Please try again shortly.',
      })
    );
    return;
  }

  // Redirect fetch() directly to the CORS-enabled binary endpoint so large APKs bypass Vercel's 4.5 MB payload cap
  res.statusCode = 302;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Location', result.downloadUrl);
  res.end();
}
