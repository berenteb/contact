import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { classNames } from "@/utils/classNames";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant?: "primary" | "secondary" | "special";
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  icon,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  const classes: string[] = [variant];
  if (className) classes.push(className);
  if (!children) classes.push("icon");
  return (
    <button
      className={classNames(...classes)}
      {...props}
      style={{ paddingLeft: icon && children ? "12px" : undefined, ...style }}
    >
      {icon && <div className="iconWrapper">{icon}</div>}
      {children}
    </button>
  );
}
