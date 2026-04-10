import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamMemberCard, type TeamMember } from "./team-member-card";
import Link from "next/link";

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ershell",
    roleKey: "management",
    avatar: "https://hyvatar.io/render/Ershell?size=256&rotate=20",
    socials: { twitter: "Ershell", discord: "ershell" },
  },
  {
    name: "Woon",
    roleKey: "art_director",
    avatar: "https://hyvatar.io/render/Woon?size=256&rotate=20",
    socials: { twitter: "DimitriWoon", discord: "dimitriwoon" },
  },
  {
    name: "Apo",
    roleKey: "developer",
    avatar: "https://hyvatar.io/render/Apo?size=256&rotate=20",
    socials: { twitter: "Apoo_Tek", discord: "apo_tek" },
  },
  {
    name: "Yakyoku",
    roleKey: "designer",
    avatar: "https://hyvatar.io/render/Yakyoku?size=256&rotate=20",
    socials: { discord: "yakyoku" },
  },
  {
    name: "Leitchap",
    roleKey: "developer",
    avatar: "https://hyvatar.io/render/eltchap?size=256&rotate=20",
    socials: { discord: "leitchap" },
  },
  {
    name: "Ikario",
    roleKey: "qa",
    avatar: "https://hyvatar.io/render/Ikario_?size=256&rotate=20",
    socials: { twitter: "IkaRio198", discord: "ikario198" },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("meta.about.title"),
    description: t("meta.about.description"),
    openGraph: {
      title: `${t("meta.about.title")} | Pyrale`,
      description: t("meta.about.description"),
      url: "https://pyrale.fr/about",
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const roles = {
    management: t("team.roles.management"),
    art_director: t("team.roles.art_director"),
    developer: t("team.roles.developer"),
    designer: t("team.roles.designer"),
    qa: t("team.roles.qa"),
  } as const;

  return (
    <div className="container mx-auto flex flex-col gap-24 md:gap-44 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
      <section className="flex flex-col items-start gap-2 text-left">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">{t("title")}</h1>
        <p className="text-normal text-muted-foreground max-w-xl md:text-lg">
          {t("subtitle")}
        </p>
      </section>

      <section className="flex flex-col-reverse items-center gap-6 lg:gap-12 lg:flex-row">
        <img src={"https://cdn.hytale.com/5e7b9ecb50cbcd001176c5c1_11___z2_camels.png"} className="aspect-[16/9] w-full lg:w-1/2 rounded-xl bg-muted" aria-hidden="true" />

        <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-1/2">
          <Badge variant="secondary"><h2>{t("means.badge")}</h2></Badge>
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-xl font-bold text-foreground md:text-3xl">{t("means.heading")}</span>
            <p className="text-sm text-muted-foreground">{t("means.description")}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 lg:gap-12 lg:flex-row">
        <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-1/2">
          <Badge variant="secondary"><h2>{t("organization.badge")}</h2></Badge>
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-xl font-bold text-foreground md:text-3xl">{t("organization.heading")}</span>
            <p className="text-sm text-muted-foreground">{t("organization.description")}</p>
          </div>
        </div>

        <img src={"https://cdn.hytale.com/5e7ba11650cbcd001176c651_59___flamingo.jpg"} className="aspect-[16/9] w-full lg:w-1/2 rounded-xl bg-muted" aria-hidden="true" />
      </section>

      <section className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <Badge variant="secondary"><h2>{t("team.badge")}</h2></Badge>

          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-xl font-bold text-foreground md:text-3xl">{t("team.heading")}</span>
            <p className="text-sm text-muted-foreground">{t("team.description")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:align-items-center lg:justify-center gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              role={roles[member.roleKey as keyof typeof roles]}
              twitterLabel={t("aria.twitter", { name: member.name })}
              discordLabel={t("aria.discord", { name: member.name })}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden flex flex-col items-center gap-6 border border-border bg-card rounded-xl p-4 md:p-6 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-gradient-to-t before:from-primary/10 before:to-transparent before:z-0">
        <div className="pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(to_right,rgba(0,0,0,0.03)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.03)_0%,transparent_100%)]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(80deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 70px),
              repeating-linear-gradient(-10deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 70px)
            `,
          } as React.CSSProperties}
        />
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary"><h2>{t("join.badge")}</h2></Badge>
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <span className="text-xl font-bold text-foreground md:text-3xl">{t("join.heading")}</span>
            <p className="max-w-sm text-sm text-muted-foreground">{t("join.description")}</p>
          </div>
        </div>
        <Button>
          <Link href="https://pyrale.com/recrutement" target="_blank">{t("join.button")}</Link>
        </Button>
      </section>

    </div>
  );
}
