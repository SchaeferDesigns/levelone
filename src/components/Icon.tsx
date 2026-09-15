import type { SVGProps } from "react";

/**
 * Schlanke Icon-Bibliothek als Inline-SVG.
 * Keine externe Abhaengigkeit, keine Emojis, volle Kontrolle ueber Strichstaerke.
 */
const paths: Record<string, React.ReactNode> = {
  dumbbell: (
    <>
      <path d="M6.5 6.5v11" />
      <path d="M3.5 9v5" />
      <path d="M17.5 6.5v11" />
      <path d="M20.5 9v5" />
      <path d="M6.5 12h11" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  users: (
    <>
      <path d="M15.5 20v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.2V20" />
      <circle cx="9.2" cy="7.6" r="3.4" />
      <path d="M21 20v-1.8a3.6 3.6 0 0 0-2.7-3.5" />
      <path d="M15.8 4.4a3.6 3.6 0 0 1 0 6.9" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12.5h3.4l1.8-4.6 3.1 9.2 2.2-5.3 1.4 2.4H21" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3s5.2 3.6 5.2 8.4A5.2 5.2 0 0 1 12 16.6a5.2 5.2 0 0 1-5.2-5.2C6.8 8.7 9 7 9 7s.4 2.2 1.7 2.8c1-1.4 1.3-4.1 1.3-6.8Z" />
      <path d="M12 21a4.3 4.3 0 0 0 4.3-4.3" />
      <path d="M12 21a4.3 4.3 0 0 1-4.3-4.3" />
    </>
  ),
  sauna: (
    <>
      <path d="M8 3c-1.4 1.8-1.4 3.2 0 5s1.4 3.2 0 5" />
      <path d="M12.5 3c-1.4 1.8-1.4 3.2 0 5s1.4 3.2 0 5" />
      <path d="M17 3c-1.4 1.8-1.4 3.2 0 5s1.4 3.2 0 5" />
      <path d="M3.5 17.5h17" />
      <path d="M5.5 21h13" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v6.2A4.8 4.8 0 0 1 11.2 20H8.8A4.8 4.8 0 0 1 4 15.2Z" />
      <path d="M16 10.5h1.8a2.7 2.7 0 0 1 0 5.4H16" />
      <path d="M7.5 3v2.6M11 3v2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.4c0 4.2-2.9 7.6-7 9.6-4.1-2-7-5.4-7-9.6V6Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.8" />
    </>
  ),
  phone: (
    <>
      <path d="M6.2 3.5h3l1.5 3.8-2 1.4a12.5 12.5 0 0 0 6.6 6.6l1.4-2 3.8 1.5v3c0 1-.8 1.8-1.8 1.7C10.7 19 5 13.3 4.5 5.3a1.8 1.8 0 0 1 1.7-1.8Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3.8 7 7.2 5.2a1.7 1.7 0 0 0 2 0L20.2 7" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <path d="M14.5 21v-7.5h2.6l.5-3.2h-3.1V8.3c0-.9.3-1.6 1.7-1.6h1.5V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.5H8.6v3.2h2.7V21" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  calendar: (
    <>
      <rect x="3.2" y="5" width="17.6" height="16" rx="3" />
      <path d="M3.2 10h17.6M8.5 3v4M15.5 3v4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5l1.7 4.3 4.3 1.7-4.3 1.7L12 15.5l-1.7-4.3L6 9.5l4.3-1.7Z" />
      <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.6" r="1.8" />
      <path d="M5.5 8.4 12 9.8l6.5-1.4" />
      <path d="M12 9.8v4.3l-2.6 5.6M12 14.1l2.6 5.6" />
    </>
  ),
  car: (
    <>
      <path d="M4 15.5V12l1.8-4.3A2 2 0 0 1 7.6 6.4h8.8a2 2 0 0 1 1.8 1.3L20 12v3.5" />
      <path d="M4 12h16" />
      <rect x="3" y="15.5" width="18" height="3.5" rx="1.4" />
      <path d="M6.5 19v1.6M17.5 19v1.6" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h8.5" />
      <path d="M17.5 12v3M20.5 12v2.2" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7.6c-1.2-1.4-3.3-2-5-.9-2 1.3-2.4 4.4-1 7.3 1 2 2.6 4.4 4.3 4.4.9 0 1.3-.5 2.4-.5s1.4.5 2.4.5c1.7 0 3.3-2.4 4.3-4.4 1.4-2.9 1-6-1-7.3-1.7-1.1-3.8-.5-5 .9Z" />
      <path d="M12 7.6c0-1.6.9-3.2 2.6-3.9" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  star: (
    <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.8l5.9-.8Z" />
  ),
  quote: (
    <>
      <path d="M9.5 6.5c-3 1.3-4.6 3.6-4.6 6.9v4.1h5.6v-5.6H7.4c0-2 .8-3.3 2.9-4.1Z" />
      <path d="M19.6 6.5c-3 1.3-4.6 3.6-4.6 6.9v4.1h5.6v-5.6h-3.1c0-2 .8-3.3 2.9-4.1Z" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6.6l10-2v11" />
      <circle cx="6.4" cy="18" r="2.6" />
      <circle cx="16.4" cy="15.6" r="2.6" />
    </>
  ),
  bike: (
    <>
      <circle cx="5.8" cy="17" r="3.4" />
      <circle cx="18.2" cy="17" r="3.4" />
      <path d="m5.8 17 4.4-7.2h4.3l3.7 7.2" />
      <path d="M10.2 9.8 8.6 6.4h3.2" />
    </>
  ),
  waves: (
    <>
      <path d="M3 8.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 2.4 1.2 3.6.4" />
      <path d="M3 13.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 2.4 1.2 3.6.4" />
      <path d="M3 18.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 2.4 1.2 3.6.4" />
    </>
  ),
  euro: (
    <>
      <path d="M18 6.5A7 7 0 0 0 7.5 12 7 7 0 0 0 18 17.5" />
      <path d="M4.5 10.2h8M4.5 13.8h8" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  document: (
    <>
      <path d="M13.5 3H7.4A2.4 2.4 0 0 0 5 5.4v13.2A2.4 2.4 0 0 0 7.4 21h9.2a2.4 2.4 0 0 0 2.4-2.4V8.5Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M8.8 13h6.4M8.8 16.5h4.4" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
    </>
  ),
};

export type IconName = keyof typeof paths;

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  strokeWidth?: number;
};

export default function Icon({ name, size = 22, strokeWidth = 1.7, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
