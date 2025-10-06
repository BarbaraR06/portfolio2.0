import { NextResponse } from "next/server";
import crypto from "crypto";

//función para generar un string aleatorio para seguridad
function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  console.log("[Spotify Login] Starting login process", {
    clientId: clientId ? "present" : "missing",
    redirectUri: redirectUri ? "present" : "missing",
  });

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 500 }
    );
  }

  //generar parámetro "state" para prevenir ataques CSRF
  const state = generateRandomString(16);

  // definición de permisos solicitados a Spotify
  const scope =
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";

  // construcción de URL de autorización de Spotify
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("client_id", clientId);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", redirectUri);
  authUrl.searchParams.append("state", state);
  authUrl.searchParams.append("scope", scope);
  authUrl.searchParams.append("show_dialog", "true");

  // crear respuesta de redirección
  const response = NextResponse.redirect(authUrl);

  // guarda el parámetro `state` en una cookie solo por el servidor, para mayor seguridad
  response.cookies.set("spotify_auth_state", state, {
    httpOnly: true, // inaccesible desde JS del cliente
    secure: process.env.NODE_ENV === "production", // solo HTTPS en producción
    sameSite: "lax", // protección contra CSRF
    path: "/", // disponible en todo el sitio
    maxAge: 60 * 10, // expira en 10 minutos
  });

  return response;
}
