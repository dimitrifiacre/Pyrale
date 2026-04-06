import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex items-center bg-input border border-border hover:bg-input-hover hover:border-border-hover font-normal w-full h-[38px] px-3.5 py-3 gap-2.5 rounded-md focus-visible:!border-primary focus-visible:border-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-background aria-invalid:ring-destructive aria-invalid:border-destructive transition-all file:h-6 file:text-sm file:font-normal md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }