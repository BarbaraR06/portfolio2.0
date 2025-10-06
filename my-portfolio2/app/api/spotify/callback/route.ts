import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const storedState = cookies().get("spotify_auth_state")?.value;

  if (error)
    return NextResponse.json(
      { error: `Spotify error: ${error}` },
      { status: 400 }
    );
  if (!code)
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  if (!state || state !== storedState)
    return NextResponse.json({ error: "State mismatch" }, { status: 403 });

  try {
    // se intercambia el código por tokens (access + refresh)
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok)
      throw new Error(
        tokenData.error_description || "Failed to get access token"
      );

    // redirección al frontend después del login
    const res = NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL!)
    );
    // eliminar la cookie de estado temporal
    res.cookies.set("spotify_auth_state", "", { path: "/", maxAge: 0 });

    // guardar el access token en una cookie segura
    res.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: tokenData.expires_in,
    });

    // guarda el refresh token con una duración de 30 días
    res.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 2592000,
    });

    // redirigir al usuario al frontend
    return res;
  } catch (err) {
    console.error("[Spotify Callback] Authentication error:", err);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
