"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "@/components/animate-ui/icons/menu";
import { LanguageSwitcher } from "../ui/language-switcher";

interface NavLink {
  labelKey: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: "navbar.links.events", href: "/events" },
  { labelKey: "navbar.links.about", href: "/about" },
  { labelKey: "navbar.links.contact", href: "/contact" },
];

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

interface UserButtonProps {
  mobile?: boolean;
  solid?: boolean;
}

function UserButton({ mobile = false, solid = true }: UserButtonProps) {
  const t = useTranslations("navbar");
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // État inconnu — on réserve l'espace pour éviter le layout shift
  if (status === "loading") {
    return mobile
      ? <div className="size-[38px]" aria-hidden />
      : <div className="h-[38px] w-[104px]" aria-hidden />;
  }

  if (status === "unauthenticated" || !session) {
    if (mobile) {
      return (
        <Button isIcon asChild>
          <Link href="/login" aria-label={t("aria.user_profile")}>
            <User />
          </Link>
        </Button>
      );
    }
    return (
      <Button asChild>
        <Link href="/login">{t("actions.login")}</Link>
      </Button>
    );
  }

  const username = session.user.username;
  const initial = username ? username[0].toUpperCase() : "?";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          isIcon
          aria-label={username ?? t("aria.user_profile")}
          className={!solid ? "hover:bg-neutral-50/10" : undefined}
        >
          <Avatar>
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <UserCircle />
          {t("user.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          {t("user.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          {t("user.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

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
        {/* Desktop nav */}
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

        {/* Desktop right */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <LanguageSwitcher solid={isSolid} />
          <UserButton solid={isSolid} />
        </div>

        {/* Mobile bar */}
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
            <MenuIcon animate={mobileOpen} size={16} className={`${!isSolid && "text-neutral-50 hover:bg-neutral-50/10"}`} />
          </Button>

          <Link
            href="/"
            aria-label={t("navbar.aria.home")}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Logo />
          </Link>

          <UserButton mobile solid={isSolid} />
        </div>
      </div>

      {/* Mobile menu */}
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
