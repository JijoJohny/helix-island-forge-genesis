import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-neu focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-neu-base text-foreground shadow-neu-raised hover:shadow-neu-floating active:shadow-neu-pressed active:bg-neu-pressed",
        destructive:
          "bg-destructive text-destructive-foreground shadow-neu-raised hover:shadow-neu-floating hover:bg-destructive/90",
        outline:
          "border border-border bg-neu-base text-foreground shadow-neu-soft hover:shadow-neu-raised active:shadow-neu-inset",
        secondary:
          "bg-secondary-soft text-secondary-foreground shadow-neu-raised hover:shadow-neu-floating hover:bg-secondary/80",
        ghost: "hover:bg-muted/30 hover:text-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        primary: 
          "bg-primary text-primary-foreground shadow-neu-raised hover:shadow-glow-mystic active:shadow-neu-pressed hover:bg-primary/90",
        mystical:
          "bg-gradient-mystic text-primary shadow-neu-soft hover:shadow-glow-mystic border border-primary/20 hover:border-primary/40 backdrop-blur-sm",
        ethereal:
          "bg-gradient-ethereal text-accent shadow-neu-soft hover:shadow-glow-ethereal border border-accent/20 hover:border-accent/40 backdrop-blur-sm"
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-10",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
