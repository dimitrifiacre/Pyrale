"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input bg-input enabled:hover:bg-input-hover enabled:hover:border-border-hover data-[state=checked]:bg-primary data-[state=checked]:border-none data-checked:bg-primary data-checked:border-primary data-[state=checked]:enabled:hover:bg-primary-hover aria-invalid:aria-checked:border-primary aria-invalid:ring-destructive aria-invalid:!border-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex size-4 items-center justify-center rounded-sm border transition-colors group-has-disabled/field:opacity-disabled peer relative shrink-0 outline-none cursor-pointer after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-disabled",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="[&>svg]:size-3.5 grid place-content-center text-primary-foreground transition-none"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }