import React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "destroy" | "secondary";
type Size = "sm" | "md";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  "aria-label"?: string;
  title?: string;
}

type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "type"> & {
  asChild?: false | undefined;
  type?: "button" | "submit" | "reset";
};

type AsChildProps = BaseProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps> & {
  asChild: true;
};

export type ButtonProps = NativeButtonProps | AsChildProps;

const cx = (...args: Array<string | undefined | false>) =>
  args.filter(Boolean).join(" ");

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    asChild = false,
    disabled = false,
    rounded = false,
    onClick,
    ...rest
  } = props as ButtonProps;

  const classes = cx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    disabled ? styles.disabled : undefined,
    rounded ? styles.rounded : undefined,
    className
  );

  if (asChild) {
    return (
      <Slot
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        aria-disabled={disabled ? "true" : undefined}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
