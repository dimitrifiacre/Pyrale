import { useTranslations } from "next-intl";
import { HeroEventBanner } from "./hero-event-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Flame } from "lucide-react";

const TERRA_NOVA_DATE = "2026-04-27T18:00:00";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <section className="relative flex h-[100dvh] flex-col"
        style={{
          backgroundImage: `

            linear-gradient(180deg,
                transparent 80%,
                color-mix(in srgb, var(--color-background), transparent 20%) 95%,
                var(--color-background) 100%
              ),

              linear-gradient(
                color-mix(in srgb, var(--color-neutral-950), transparent 80%),
                color-mix(in srgb, var(--color-neutral-950), transparent 80%)
              ),

              url('/images/hero.webp')
            `,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="relative flex flex-1 flex-col justify-center">
          <div className="container mx-auto flex flex-col gap-16 md:gap-32 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
            <div className="flex flex-col items-start gap-2 text-left">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-50 max-w-lg md:text-4xl">
                {t("hero.title")}
              </h1>
              <p className="text-normal text-neutral-50/50 max-w-xl md:text-lg">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-[60%]">
          <div className="container mx-auto px-6 md:px-12">
            <HeroEventBanner eventName="TERRA NOVA" eventDate={TERRA_NOVA_DATE} eventHref="/events" />
          </div>
        </div> */}

      </section>
      <div className="container mx-auto flex flex-col gap-24 md:gap-44 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
        <section className="flex flex-col-reverse items-center gap-6 lg:gap-12 lg:flex-row">
          <img src={"https://cdn.hytale.com/5e7ba4323c9a2a001067937e_101___adventurer_vs_sabertooth.jpg"} className="aspect-[16/9] w-full lg:w-1/2 rounded-xl bg-muted" aria-hidden="true" />

          <div className="flex flex-col items-start gap-3 md:gap-4 w-full lg:w-1/2">
            <Badge variant="secondary"><h2>Qui est Pyrale ?</h2></Badge>
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-xl font-bold text-foreground md:text-3xl">Un groupe événementiel sur Hytale</span>
              <p className="text-sm text-muted-foreground">Pyrale est une association de passionnés qui conçoit et organise des événements sur Hytale. Véritable laboratoire d’idées, nous imaginons, testons et faisons évoluer des expériences uniques pour la communauté, avec une approche collaborative et transparente.</p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 md:gap-4 w-full lg:w-1/2">
            <Badge variant="secondary"><h2>Nos événements</h2></Badge>
            <div className="flex flex-col items-center text-center gap-1 md:gap-2">
              <span className="text-xl font-bold text-foreground md:text-3xl">Quelque chose se prépare...</span>
              <p className="text-sm text-muted-foreground">Nos premiers événements sont actuellement en préparation, les annonces seront publiées prochainement.</p>
            </div>
            <Flame className="text-muted-foreground size-16" />
          </div>
        </section>

        <section className="relative overflow-hidden flex flex-col items-center gap-6 border border-border bg-card rounded-xl p-4 md:p-6 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-gradient-to-t before:from-[#5865F2]/10 before:to-transparent before:z-0">
          <div className="pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(to_right,rgba(0,0,0,0.03)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.03)_0%,transparent_100%)]"
            style={{
              backgroundImage: `
              repeating-linear-gradient(80deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 70px),
              repeating-linear-gradient(-10deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 70px)
              `,
            } as React.CSSProperties}
            />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <span className="text-xl font-bold text-foreground md:text-3xl">{t("discord.heading")}</span>
              <p className="max-w-sm text-sm text-muted-foreground">{t("discord.description")}</p>
            </div>
          </div>
          <Button className="text-white bg-[#5865F2] hover:bg-[#4B59F1]" asChild>
            <Link href="http://pyrale.com/discord" target="_blank">{t("discord.button")}</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
