"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const SOCIAL_LINKS = [
    {
        key: "X / Twitter",
        href: "http://pyrale.com/x",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        key: "Discord",
        href: "http://pyrale.com/discord",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
    },
    {
        key: "TikTok",
        href: "http://pyrale.com/tiktok",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
            </svg>
        ),
    },
];

function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const t = useTranslations();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="secondary" disabled>
                <SunMoon />
                {t("footer.bottom.theme.label")}
            </Button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button variant="secondary" onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? <Moon /> : <Sun />}
            {isDark ? t("footer.bottom.theme.dark") : t("footer.bottom.theme.light")}
        </Button>
    );
}

function FooterLinkGroup({ section }: { section: FooterSection }) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">{section.title}</p>
            <div className="flex flex-col items-start gap-2">
                {section.links.map(({ label, href }) => (
                    <Link key={href} href={href} className="text-sm font-normal text-muted-foreground transition-all hover:text-foreground">
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Footer() {
    const t = useTranslations();

    const NAV_SECTION: FooterSection = {
        title: t("footer.sections.navigation.title"),
        links: [
            { label: t("footer.sections.navigation.home"), href: "/" },
            { label: t("footer.sections.navigation.events"), href: "/events" },
            { label: t("footer.sections.navigation.about"), href: "/about" },
            { label: t("footer.sections.navigation.contact"), href: "/contact" },
        ],
    };

    const LEGAL_SECTION: FooterSection = {
        title: t("footer.sections.legal.title"),
        links: [
            { label: t("footer.sections.legal.terms"), href: "/terms" },
            { label: t("footer.sections.legal.privacy"), href: "/privacy" },
            { label: t("footer.sections.legal.notice"), href: "/notices" },
        ],
    };

    return (
        <footer className="relative overflow-hidden border-t border-border bg-background">
            <div className="pointer-events-none absolute -bottom-48 left-1/2 h-96 w-full -translate-x-1/2 rounded-[100%] bg-primary/10 blur-[120px]" aria-hidden="true"/>
            <div className="container mx-auto flex flex-col gap-8 px-6 pt-16 pb-8 md:px-12 md:pt-24">

                <div className="flex w-full flex-col gap-12 lg:flex-row lg:justify-between">

                    <div className="flex items-start shrink-0 flex-col gap-8">
                        <Link href="/" aria-label={t("footer.brand.home_aria")}>
                            <Logo />
                        </Link>

                        <p className="max-w-[140px] text-sm text-muted-foreground">
                            {t("footer.brand.tagline")}
                        </p>

                        <div className="flex items-center gap-6">
                            {SOCIAL_LINKS.map(({ key, href, icon }) => (
                                <Link key={key} href={href} aria-label={t("footer.social.aria_label", { name: key })} className="flex size-5 text-foreground" target="_blank">
                                    {icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <nav className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-24" aria-label={t("footer.sections.title")}>
                        <FooterLinkGroup section={NAV_SECTION} />
                        <FooterLinkGroup section={LEGAL_SECTION} />
                    </nav>
                </div>

                <div className="border-t border-border" />

                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <p className="text-sm text-muted-foreground">
                        {t("footer.bottom.copyright", { year: new Date().getFullYear() })}
                    </p>
                    <ThemeToggle />
                </div>

            </div>
        </footer>
    );
}