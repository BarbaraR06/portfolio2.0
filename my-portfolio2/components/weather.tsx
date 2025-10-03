"use client";
import { useEffect, useState } from "react";
import { getWeather } from "@/app/utils/getWeather";
import Image from "next/image";

const weatherIcons: Record<string, string> = {
  Clear: "/sunny.svg",
  Clouds: "/cloudy.svg",
  Rain: "/rain.svg",
  Thunderstorm: "/storm.svg",
};

export default function WeatherFooter() {
  const [weather, setWeather] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada en este navegador.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data.weather[0].main);
        } catch {
          setError("No se pudo obtener el clima.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("No se pudo acceder a la ubicación.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="p-4 flex justify-center items-center text-gray-500">
      </section>
    );
  }

  const icon = weather ? weatherIcons[weather] : null;

  return (
    <section className="p-4 flex justify-center items-center gap-2">
      {icon && (
        <Image 
          alt="Weather Icon"
          className="w-8 h-8"
          src={icon}
          width={32}
          height={32}
        />
      )}
    </section>
  );
}