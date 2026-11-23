import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva("rounded-lg border px-4 py-2.5 leading-snug", {
  variants: {
    variant: {
      primary:
        "border-transparent bg-teal-800 text-white font-semibold hover:bg-teal-900",
      secondary: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonVariants({ variant, className })}
      {...props}
    />
  );
}
