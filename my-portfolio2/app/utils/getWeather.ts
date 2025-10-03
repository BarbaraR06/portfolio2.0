export async function getWeather(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  if (!apiKey) {
    throw new Error("API missing");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error finding weather");
  return res.json();
}
