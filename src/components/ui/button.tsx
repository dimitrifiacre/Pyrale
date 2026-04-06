import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-disabled disabled:cursor-not-allowed [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-brand-linear text-primary-foreground hover:bg-brand-linear-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:bg-accent text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
      },
      size: {
        sm: "gap-0.5 text-sm h-[32px] px-3 py-2 [&_svg]:size-4",
        md: "gap-1 text-sm h-[38px] px-3.5 py-3 [&_svg]:size-4",
        lg: "gap-1.5 text-md h-[44px] px-4 py-3 [&_svg]:size-5",
      },
      isIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isIcon: true,
        size: "sm",
        className: "w-[32px] p-0",
      },
      {
        isIcon: true,
        size: "md",
        className: "w-[38px] p-0",
      },
      {
        isIcon: true,
        size: "lg",
        className: "w-[44px] p-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      isIcon: false,
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "md",
  isIcon = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, isIcon, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }