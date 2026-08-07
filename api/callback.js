export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const { code, error, error_description: errorDescription } = req.query;

  if (error) {
    res.status(400).send(`Ошибка авторизации GitHub: ${errorDescription || error}`);
    return;
  }

  if (!clientId || !clientSecret) {
    res.status(500).send('OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET не настроены на сервере.');
    return;
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    res.status(400).send(`Ошибка обмена кода на токен: ${tokenData.error_description || tokenData.error}`);
    return;
  }

  const payload = { token: tokenData.access_token, provider: 'github' };
  const payloadJson = JSON.stringify(payload).replace(/</g, '\\u003c');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!doctype html>
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
</html>`);
}
