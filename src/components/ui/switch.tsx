"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "border-input data-[state=checked]:bg-primary data-[state=checked]:border-none data-checked:bg-primary data-[state=unchecked]:bg-input data-[state=unchecked]:enabled:hover:bg-input-hover data-[state=unchecked]:enabled:hover:border-border-hover data-[state=checked]:enabled:hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive aria-invalid:!border-destructive shrink-0 rounded-full border data-[size=default]:h-[20px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="group-data-[state=checked]/switch:bg-background dark:group-data-[state=checked]/switch:bg-foreground bg-foreground rounded-full pointer-events-none block ring-0 transition-transform translate-x-[1px] group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[state=checked]/switch:translate-x-[14px] group-data-[state=checked]/switch:group-data-[size=sm]/switch:translate-x-[10px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }