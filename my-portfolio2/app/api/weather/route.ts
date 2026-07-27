import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const apiKey = process.env.OPENWEATHER_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

 try {
    const res = await fetch(url, { cache: "no-store" });
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error de OpenWeather:", errorData);
      return NextResponse.json({ error: "OpenWeather API Error", details: errorData }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error interno:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
