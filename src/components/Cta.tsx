import Link from "next/link";
import Icon from "./Icon";
import type { IconName } from "./Icon";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  icon?: IconName;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export default function Cta({
  href,
  children,
  variant = "primary",
  icon = "arrowRight",
  className = "",
  external = false,
  ariaLabel,
}: Props) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} strokeWidth={2.1} /> : null}
    </>
  );

  if (external) {
    return (
      <a className={cls} href={href} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link className={cls} href={href} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
