const encoder = new TextEncoder();

function secret(): string {
  const value = process.env.ADMIN_KEY;
  if (!value) throw new Error("ADMIN_KEY is not configured.");
  return value;
}

function base64url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64url(new Uint8Array(signature));
}

/** Session token: "<expiry-ms>.<hmac>". Signed with ADMIN_KEY, so rotating the key invalidates every session. */
export async function createSession(hours = 12): Promise<string> {
  const expiry = String(Date.now() + hours * 60 * 60 * 1000);
  return expiry + "." + (await sign(expiry));
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (Number(expiry) < Date.now()) return false;
  const expected = await sign(expiry);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return mismatch === 0;
}

export const SESSION_COOKIE = "nafaqo_admin";
