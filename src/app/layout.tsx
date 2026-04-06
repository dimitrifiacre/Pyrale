import type { Metadata } from "next";
import { Rubik, Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const rubikSans = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const t = await getTranslations();

export const metadata: Metadata = {
  openGraph: {
    siteName: "Pyrale",
    images: [
      {
        url: "/images/overview.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  metadataBase: new URL(
    process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://pyrale.com'
  ),
  title: {
    default: `Pyrale | ${t("meta.home.title")}`,
    template: "%s | Pyrale",
  },
  description: t("meta.home.description"),
  icons: {
    icon: "/images/logo.svg",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${rubikSans.variable} min-h-screen bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}