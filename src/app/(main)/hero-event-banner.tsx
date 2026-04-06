"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroCountdown } from "./hero-countdown";

interface HeroEventBannerProps {
  eventName: string;
  eventDate: string;
  eventHref: string;
}

export function HeroEventBanner({ eventName, eventDate, eventHref }: HeroEventBannerProps) {
  const t = useTranslations("home.event_banner");

  return (
      <div className="overflow-hidden rounded-xl border border-border bg-[#0B1B20] flex flex-col gap-12 p-8 md:p-12 items-center md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">            
            <span className="tracking-widest text-white/50 uppercase">{t("label")}</span>
            <span className="text-2xl font-bold tracking-[0.15em] text-white md:text-3xl">{eventName}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-neutral-50 text-neutral-950 hover:bg-neutral-100 hover:text-neutral-950">
              <Link href={eventHref}>{t("cta_join")}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={eventHref}>{t("cta_learn_more")}</Link>
            </Button>
          </div>
        </div>
        <HeroCountdown targetDate={eventDate} />
      </div>
  );
}
