import type { ReactNode } from "react";
import Reveal from "./Reveal";

type HeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({ eyebrow, title, text, align = "left", id }: HeaderProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={centered ? "text-center mx-auto max-w-[760px]" : "max-w-[760px]"}
      id={id}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="display-huge mt-4">{title}</h2>
      {text ? <p className="lead mt-5">{text}</p> : null}
    </Reveal>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
};

export default function Section({ children, className = "", id, as = "section" }: SectionProps) {
  const Tag = as;
  return (
    <Tag id={id} className={`section-y ${className}`.trim()}>
      <div className="shell">{children}</div>
    </Tag>
  );
}
