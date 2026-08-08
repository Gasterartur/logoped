export const config = { name: "cms-auth" };

export default {
  async fetch(request, ctx) {
    const clientId = ctx.env.OAUTH_CLIENT_ID;
    if (!clientId) {
      return new Response('OAUTH_CLIENT_ID is not configured on the server.', { status: 500 });
    }

    const url = new URL(request.url);
    const redirectUri = `${url.origin}/api/callback`;

    const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
    authorizeUrl.searchParams.set('client_id', clientId);
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    authorizeUrl.searchParams.set('scope', 'repo,user');

    return Response.redirect(authorizeUrl.toString(), 302);
  },
};
