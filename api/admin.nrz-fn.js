export const config = { name: "admin-api" };

const REPO = "Gasterartur/logoped";
const BRANCH = "main";
const SESSION_TTL = 60 * 60 * 24 * 7;
const PBKDF2_ITERATIONS = 100000;

const FILES = {
  prices: "src/content/prices.json",
  services: "src/content/services.json",
  reviews: "src/content/reviews.json",
};

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function utf8ToBase64(str) {
  return bytesToBase64(new TextEncoder().encode(str));
}

function base64ToUtf8(b64) {
  return new TextDecoder().decode(base64ToBytes(b64));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hashPassword(password, saltBytes) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return bytesToBase64(new Uint8Array(derived));
}

async function makePasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await hashPassword(password, salt);
  return { salt: bytesToBase64(salt), hash };
}

async function verifyPassword(password, record) {
  const hash = await hashPassword(password, base64ToBytes(record.salt));
  return timingSafeEqual(hash, record.hash);
}

async function getPasswordRecord(ctx) {
  const raw = await ctx.kv.get("admin:password");
  if (!raw) return null;
  return JSON.parse(new TextDecoder().decode(raw));
}

async function checkPassword(password, ctx) {
  if (typeof password !== "string" || !password) return false;
  const stored = await getPasswordRecord(ctx);
  if (stored) return verifyPassword(password, stored);
  const bootstrap = ctx.env.ADMIN_PASSWORD || "";
  return bootstrap.length > 0 && timingSafeEqual(password, bootstrap);
}

async function createSession(ctx) {
  const token = crypto.randomUUID();
  await ctx.kv.set(`session:${token}`, "1", { ttl: SESSION_TTL });
  return token;
}

async function isValidSession(ctx, token) {
  if (!token) return false;
  return (await ctx.kv.get(`session:${token}`)) !== null;
}

function sessionCookie(token) {
  return `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL}`;
}

function clearSessionCookie() {
  return "admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
}

async function githubRequest(path, ctx, init = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${ctx.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "logoped-admin-function",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
  });
}

async function handleLogin(request, ctx) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const ok = await checkPassword(body.password, ctx);
  if (!ok) return new Response("Неверный пароль", { status: 401 });

  const token = await createSession(ctx);
  return new Response(null, { status: 204, headers: { "Set-Cookie": sessionCookie(token) } });
}

async function handleChangePassword(request, ctx) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const { oldPassword, newPassword } = body;
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return new Response("Новый пароль должен быть не короче 8 символов", { status: 400 });
  }
  const ok = await checkPassword(oldPassword, ctx);
  if (!ok) return new Response("Текущий пароль неверен", { status: 401 });

  const record = await makePasswordRecord(newPassword);
  await ctx.kv.set("admin:password", JSON.stringify(record));
  return Response.json({ ok: true });
}

async function handleGetContent(url, ctx) {
  const file = url.searchParams.get("file");
  const path = FILES[file];
  if (!path) return new Response("Unknown file", { status: 400 });

  const res = await githubRequest(`/repos/${REPO}/contents/${path}?ref=${BRANCH}`, ctx);
  if (!res.ok) return new Response("Не удалось получить файл из GitHub", { status: 502 });

  const data = await res.json();
  return Response.json({ content: JSON.parse(base64ToUtf8(data.content)), sha: data.sha });
}

async function handlePutContent(url, request, ctx) {
  const file = url.searchParams.get("file");
  const path = FILES[file];
  if (!path) return new Response("Unknown file", { status: 400 });

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (!body || !Array.isArray(body.items)) {
    return new Response("Ожидается { items: [...] }", { status: 400 });
  }

  const getRes = await githubRequest(`/repos/${REPO}/contents/${path}?ref=${BRANCH}`, ctx);
  if (!getRes.ok) return new Response("Не удалось получить текущую версию файла", { status: 502 });
  const current = await getRes.json();

  const newContent = JSON.stringify({ items: body.items }, null, 2) + "\n";

  const putRes = await githubRequest(`/repos/${REPO}/contents/${path}`, ctx, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Обновление ${file} через админку`,
      content: utf8ToBase64(newContent),
      sha: current.sha,
      branch: BRANCH,
    }),
  });

  if (!putRes.ok) {
    if (putRes.status === 409) {
      return new Response("Файл изменился с момента загрузки, обновите страницу", { status: 409 });
    }
    const errText = await putRes.text();
    return new Response(`Ошибка сохранения: ${errText}`, { status: 502 });
  }

  return Response.json({ ok: true });
}

export default {
  async fetch(request, ctx) {
    const url = new URL(request.url);
    const cookies = parseCookies(request.headers.get("cookie"));
    const sessionToken = cookies.admin_session;

    if (url.pathname === "/api/admin/login" && request.method === "POST") {
      return handleLogin(request, ctx);
    }

    if (url.pathname === "/api/admin/logout" && request.method === "POST") {
      if (sessionToken) await ctx.kv.delete(`session:${sessionToken}`);
      return new Response(null, { status: 204, headers: { "Set-Cookie": clearSessionCookie() } });
    }

    if (url.pathname === "/api/admin/session" && request.method === "GET") {
      return Response.json({ authenticated: await isValidSession(ctx, sessionToken) });
    }

    if (!(await isValidSession(ctx, sessionToken))) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (url.pathname === "/api/admin/content" && request.method === "GET") {
      return handleGetContent(url, ctx);
    }

    if (url.pathname === "/api/admin/content" && request.method === "PUT") {
      return handlePutContent(url, request, ctx);
    }

    if (url.pathname === "/api/admin/change-password" && request.method === "POST") {
      return handleChangePassword(request, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
