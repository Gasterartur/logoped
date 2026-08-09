export function getEmbedUrl(rawUrl) {
  if (!rawUrl) return null;

  let url;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');

  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    let id = url.searchParams.get('v');
    if (!id && url.pathname.startsWith('/embed/')) id = url.pathname.split('/')[2];
    if (!id && url.pathname.startsWith('/shorts/')) id = url.pathname.split('/')[2];
    if (id) return { provider: 'YouTube', embedUrl: `https://www.youtube.com/embed/${id}` };
  }

  if (host === 'youtu.be') {
    const id = url.pathname.slice(1);
    if (id) return { provider: 'YouTube', embedUrl: `https://www.youtube.com/embed/${id}` };
  }

  if (host === 'vk.com' || host === 'vkvideo.ru' || host === 'vk.ru') {
    let match = url.pathname.match(/video(-?\d+)_(\d+)/);
    if (!match) {
      const z = url.searchParams.get('z') || '';
      match = z.match(/video(-?\d+)_(\d+)/);
    }
    if (match) {
      const [, oid, id] = match;
      return { provider: 'VK Видео', embedUrl: `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2` };
    }
  }

  if (host === 'rutube.ru') {
    const match = url.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
    if (match) {
      return { provider: 'RuTube', embedUrl: `https://rutube.ru/play/embed/${match[1]}` };
    }
  }

  return null;
}
