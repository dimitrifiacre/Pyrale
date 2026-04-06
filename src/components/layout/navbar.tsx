"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Globe, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { MenuIcon } from "@/components/animate-ui/icons/menu";

interface NavLink {
  labelKey: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: "navbar.links.events", href: "/events" },
  { labelKey: "navbar.links.about", href: "/about" },
  { labelKey: "navbar.links.contact", href: "/contact" },
  { labelKey: "navbar.links.playground", href: "/playground" },
];

const LANGUAGES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

function LanguageSwitcher({ solid }: { solid: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          isIcon
          aria-label={t("navbar.actions.change_language")}
          className={!solid ? "text-neutral-50 hover:text-neutral-50 hover:bg-neutral-50/10" : undefined}
          
        >
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {LANGUAGES.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NavbarProps {
  variant?: "default" | "immersive";
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  const isImmersive = variant === "immersive";
  const isSolid = !isImmersive || scrolled || mobileOpen;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isSolid
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent border-none bg-gradient-to-b from-neutral-950/50 to-neutral-950/0",
      ].join(" ")}
    >
      {!isSolid && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
        />
      )}

      <div className="relative container mx-auto flex h-[70px] items-center justify-between px-6 md:px-12">
        <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6">
          <Link href="/" aria-label={t("navbar.aria.home")}>
            <Logo />
          </Link>
          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ labelKey, href }) => (
              <Button
                key={href}
                variant="ghost"
                className={`font-normal text-sm ${isSolid ? "text-muted-foreground hover:text-foreground" : "text-neutral-50/50 hover:text-neutral-50 hover:bg-neutral-50/10"}`}
                asChild
              >
                <Link href={href}>{t(labelKey)}</Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-2">
          <LanguageSwitcher solid={isSolid} />
          <Button asChild>
            <Link href="/login">{t("navbar.actions.login")}</Link>
          </Button>
        </div>

        <div className="relative flex w-full items-center justify-between md:hidden">
          <Button
            variant="ghost"
            isIcon
            aria-label={
              mobileOpen
                ? t("navbar.aria.close_menu")
                : t("navbar.aria.open_menu")
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <MenuIcon animate={mobileOpen} size={16} />
          </Button>

          <Link
            href="/"
            aria-label={t("navbar.aria.home")}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Logo />
          </Link>

          <Button isIcon asChild>
            <Link href="/login" aria-label={t("navbar.aria.user_profile")}>
              <User />
            </Link>
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-2 inset-x-0 top-full px-6 py-3 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ labelKey, href }) => (
                <Button
                  key={href}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground font-normal text-sm hover:text-foreground"
                  asChild
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={href}>{t(labelKey)}</Link>
                </Button>
              ))}
            </nav>

            <LanguageSwitcher solid={isSolid} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
