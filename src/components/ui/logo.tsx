"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const logoVariants = cva(
  "inline-block transition-colors duration-200 shrink-0",
  {
    variants: {
      variant: {
        original: "",
        monochrome: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "original",
    },
  }
);

export interface LogoProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof logoVariants> {}

const LOGO_PATHS = (fill: string) => (
  <>
    <path d="M2.41114 0.223597L14.2865 7.21939C16.5301 8.54108 17.9921 10.8738 18.206 13.4731C18.206 13.4731 18.6411 16.9381 18.6748 19.1703C18.7096 21.4781 18.3545 25.0717 18.3545 25.0717L18.11 28.9927C18.0046 30.6831 16.6058 32 14.9158 32H5.92082C5.03704 32 4.32059 31.282 4.32059 30.3963V23.9815C4.32059 21.4849 6.218 19.4325 8.64646 19.1936L3.03293 15.7947C1.15044 14.6548 0 12.6112 0 10.407V1.60614C0 0.366029 1.34437 -0.404833 2.41114 0.223597Z" fill={fill} />
    <path d="M36.5889 0.223597L24.7135 7.21939C22.4699 8.54108 21.0079 10.8738 20.794 13.4731C20.794 13.4731 20.3589 16.9381 20.3252 19.1703C20.2904 21.4781 20.6455 25.0717 20.6455 25.0717L20.89 28.9927C20.9954 30.6831 22.3942 32 24.0842 32H33.0792C33.963 32 34.6794 31.282 34.6794 30.3963V23.9815C34.6794 21.4849 32.782 19.4325 30.3535 19.1936L35.9671 15.7947C37.8496 14.6548 39 12.6112 39 10.407V1.60614C39 0.366029 37.6556 -0.404833 36.5889 0.223597Z" fill={fill} />
    <path d="M19.047 2.46927C19.2267 2.08486 19.7733 2.08486 19.953 2.46927L19.9702 2.50612C20.5624 3.77342 21.4337 4.9159 22.4908 5.83539C22.74 6.05218 22.74 6.44782 22.4908 6.66461C21.4337 7.5841 20.5624 8.72658 19.9702 9.99388L19.953 10.0307C19.7733 10.4151 19.2267 10.4151 19.047 10.0307L19.0298 9.99388C18.4375 8.72658 17.5663 7.5841 16.5092 6.66461C16.26 6.44782 16.26 6.05218 16.5092 5.83539C17.5663 4.9159 18.4375 3.77342 19.0298 2.50612L19.047 2.46927Z" fill={fill} />
  </>
);

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ className, variant, ...props }, ref) => {
    const isMonochrome = variant === "monochrome";
    
    const uniqueId = React.useId();
    const gradientId = `logo_gradient_${uniqueId.replace(/:/g, "")}`;

    return (
      <svg
        ref={ref}
        width="39"
        height="32"
        viewBox="0 0 39 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(logoVariants({ variant }), className)}
        {...props}
      >
        {isMonochrome ? (
          LOGO_PATHS("currentColor")
        ) : (
          <>
            {LOGO_PATHS(`url(#${gradientId})`)}
            <defs>
              <linearGradient
                id={gradientId}
                x1="8.37676"
                y1="0"
                x2="27.2298"
                y2="32.7673"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8F6C" />
                <stop offset="0.5" stopColor="#F0513C" />
                <stop offset="1" stopColor="#EB3B50" />
              </linearGradient>
            </defs>
          </>
        )}
      </svg>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };