import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:shadow-md",
        secondary:
          "border-secondary/20 bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary hover:shadow-md",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive hover:shadow-md",
        outline: "border-border bg-background text-foreground hover:bg-accent",
        success: "border-emerald-200 bg-emerald-100 text-emerald-700 hover:shadow-md",
        warning: "border-amber-200 bg-amber-100 text-amber-700 hover:shadow-md",
        info: "border-blue-200 bg-blue-100 text-blue-700 hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
