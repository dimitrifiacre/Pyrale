"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";

const IMMERSIVE_PATHS = ["/"];

export function NavbarWrapper() {
  const pathname = usePathname();
  const variant = IMMERSIVE_PATHS.includes(pathname) ? "immersive" : "default";
  return <Navbar variant={variant} />;
}
