export const config = { name: "cms-callback" };

export default {
  async fetch(request, ctx) {
    const clientId = ctx.env.OAUTH_CLIENT_ID;
    const clientSecret = ctx.env.OAUTH_CLIENT_SECRET;
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (error) {
      return new Response(`Ошибка авторизации GitHub: ${errorDescription || error}`, { status: 400 });
    }

    if (!clientId || !clientSecret) {
      return new Response('OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET не настроены на сервере.', { status: 500 });
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(`Ошибка обмена кода на токен: ${tokenData.error_description || tokenData.error}`, { status: 400 });
    }

    const payload = { token: tokenData.access_token, provider: 'github' };
    const payloadJson = JSON.stringify(payload).replace(/</g, '\\u003c');

    const html = `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:github:success:${payloadJson}',
            message.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    Авторизация выполнена, можно закрыть это окно.
  </body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};
