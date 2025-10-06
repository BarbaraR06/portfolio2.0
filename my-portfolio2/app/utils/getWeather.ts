export async function getWeather(lat: number, lon: number) {

  
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    throw new Error("Error finding weather");
  }

  const data = await res.json();
  return data;
}