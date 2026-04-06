"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["JRS", "HRS", "MIN", "SEC"] as const;

export function HeroCountdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const values = [timeLeft?.days ?? 0, timeLeft?.hours ?? 0, timeLeft?.minutes ?? 0, timeLeft?.seconds ?? 0];

  return (
    <div className="flex items-center gap-4">
      {UNITS.map((unit, i) => (
        <div key={unit} className="flex flex-col items-center gap-1.5">
          <span className="text-3xl font-bold text-white tabular-nums leading-none">
            {String(values[i]).padStart(2, "0")}
          </span>
          <span className="tracking-widest text-white/50 uppercase">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
