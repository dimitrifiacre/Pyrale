import Link from "next/link";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-12 md:gap-8 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">Page introuvable</h1>
          <p className="text-normal text-muted-foreground max-w-sm md:text-lg">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
        </div>
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}