import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "./contact-form";
import { RecaptchaProvider } from "@/components/contact/recaptcha-provider";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("meta.contact.title"),
    description: t("meta.contact.description"),
    openGraph: {
      title: `${t("meta.contact.title")} | Pyrale`,
      description: t("meta.contact.description"),
      url: "https://pyrale.fr/contact",
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <RecaptchaProvider />
      <div className="container mx-auto flex flex-col gap-16 md:gap-32 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
        <section className="flex flex-col items-start gap-16 md:items-center">
          <div className="flex flex-col items-start gap-2 text-left md:items-center md:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h1>
            <p className="text-normal text-muted-foreground max-w-sm md:text-lg">
              {t("subtitle")}
            </p>
          </div>

          <ContactForm />
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
