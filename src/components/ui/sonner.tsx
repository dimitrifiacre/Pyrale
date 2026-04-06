"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, Loader2Icon, CircleXIcon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      offset={100}
      icons={{
        success: (
          <CircleCheckIcon className="size-6 h-auto text-success" />
        ),
        info: (
          <InfoIcon className="size-6 h-auto" />
        ),
        warning: (
          <TriangleAlertIcon className="size-6 h-auto text-[#F0513C]" />
        ),
        error: (
          <CircleXIcon className="size-6 h-auto text-destructive" />
        ),
        loading: (
          <Loader2Icon className="size-6 h-auto animate-spin" />
        ),
      }}
      toastOptions={{
        style: {
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        },
        classNames: {
          toast: "group toast !rounded-lg !font-normal !bg-card !border-border !gap-3 !p-3 !pl-4 !text-sm before:absolute before:inset-y-0 before:left-0 before:w-[140px] before:content-[''] before:pointer-events-none before:transition-opacity",
          title: "!text-foreground", 
          description: "!text-muted-foreground",
          info: "before:bg-gradient-to-r before:from-foreground/10 before:to-foreground/0",
          success: "before:bg-gradient-to-r before:from-success/10 before:to-success/0",
          error: "before:bg-gradient-to-r before:from-destructive/10 before:to-destructive/0",
          warning: "before:bg-gradient-to-r before:from-[#F0513C]/10 before:to-[#F0513C]/0",
          loading: "before:bg-gradient-to-r before:from-foreground/10 before:to-foreground/0 !p-3 !pl-4",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }