type IconProps = {
  className?: string;
};

const baseClass = "h-4 w-4";

export function HomeIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 9.75V21h13.5V9.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 21v-6h4.5v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4.5 7.5h15l-1.5 10.5H6L4.5 7.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7.5a3 3 0 0 1 6 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 17.25V6.75Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m6 7.5 6 5.25 6-5.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CartIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3.75 5.25h1.5l1.8 8.25h9.9l1.8-6H7.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="18.75" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="17.25" cy="18.75" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MenuIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="m6.75 6.75 10.5 10.5M17.25 6.75 6.75 17.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M5.25 12h13.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12.75 6.75 5.25 5.25-5.25 5.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TruckIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3.75 6.75h10.5v8.25H3.75V6.75Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.25 9h3.17l2.83 2.83V15h-6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.25" r="1.5" />
      <circle cx="17.25" cy="17.25" r="1.5" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 3.75 5.25 6.75v5.52c0 4.06 2.88 7.83 6.75 8.98 3.87-1.15 6.75-4.92 6.75-8.98V6.75L12 3.75Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9.3 12.15 1.8 1.8 3.6-4.05" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M2.9 12c1.77-3.48 5.21-5.62 9.1-5.62 3.89 0 7.33 2.14 9.1 5.62-1.77 3.48-5.21 5.62-9.1 5.62-3.89 0-7.33-2.14-9.1-5.62Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function FacebookIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.39 21v-7.12h2.4l.36-2.78h-2.76V9.32c0-.8.23-1.35 1.38-1.35h1.48V5.48c-.26-.03-1.12-.1-2.13-.1-2.11 0-3.56 1.29-3.56 3.66v2.06H8.17v2.78h2.39V21h2.83Z" />
    </svg>
  );
}

export function XIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 3H21l-4.58 5.23L21.8 21h-4.2l-3.3-4.92L9.97 21H7.86l4.9-5.6L3 3h4.3l2.98 4.53L13.9 3h2.1Zm-1.47 16.4h1.16L6.67 4.5H5.42L17.43 19.4Z" />
    </svg>
  );
}

export function PinterestIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.75a8.25 8.25 0 0 0-3.01 15.93c-.04-1.21-.01-2.67.32-4.06l1.17-4.97s-.3-.6-.3-1.48c0-1.38.8-2.42 1.8-2.42.85 0 1.25.64 1.25 1.4 0 .85-.54 2.13-.82 3.31-.24 1 .5 1.82 1.49 1.82 1.79 0 2.99-2.3 2.99-5.03 0-2.08-1.4-3.64-3.95-3.64-2.88 0-4.68 2.15-4.68 4.55 0 .83.25 1.42.64 1.87.18.22.2.31.14.56-.05.18-.16.63-.2.81-.06.25-.27.34-.5.25-1.39-.57-2.04-2.11-2.04-3.82 0-2.84 2.39-6.25 7.14-6.25 3.82 0 6.33 2.77 6.33 5.74 0 3.93-2.18 6.86-5.4 6.86-1.08 0-2.1-.58-2.45-1.24l-.66 2.58c-.24.92-.7 2.06-1.12 2.84.84.25 1.72.38 2.63.38A8.25 8.25 0 0 0 12 3.75Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.74A1.69 1.69 0 1 0 6.9 5.36a1.69 1.69 0 0 0 .04 3.38ZM5.48 10.08h2.86V19.5H5.48v-9.42Zm4.66 0H12.9v1.29h.04c.38-.72 1.3-1.48 2.67-1.48 2.86 0 3.39 1.88 3.39 4.32v5.29h-2.85v-4.69c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v4.77h-2.85v-9.42Z" />
    </svg>
  );
}

export function TelegramIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.57 5.31 4.98 10.93c-.99.4-.98.96-.18 1.2l3.75 1.17 1.45 4.45c.18.5.09.7.61.7.4 0 .58-.18.8-.4l1.82-1.77 3.78 2.79c.7.39 1.2.19 1.37-.64l2.48-11.7c.25-1.02-.4-1.48-1.29-1.08Zm-2.22 2.33-6.64 6.01-.26 3.06-.92-2.95 7.82-6.12Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.58 8.19a2.93 2.93 0 0 0-2.06-2.08C17.7 5.63 12 5.63 12 5.63s-5.7 0-7.52.48A2.93 2.93 0 0 0 2.42 8.2C1.94 10.03 1.94 12 1.94 12s0 1.97.48 3.8a2.93 2.93 0 0 0 2.06 2.08c1.82.48 7.52.48 7.52.48s5.7 0 7.52-.48a2.93 2.93 0 0 0 2.06-2.08c.48-1.83.48-3.8.48-3.8s0-1.97-.48-3.8ZM10.08 14.67V9.33L14.76 12l-4.68 2.67Z" />
    </svg>
  );
}

export function InstagramIcon({ className = baseClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.3 3.75h9.4a3.55 3.55 0 0 1 3.55 3.55v9.4a3.55 3.55 0 0 1-3.55 3.55H7.3a3.55 3.55 0 0 1-3.55-3.55V7.3A3.55 3.55 0 0 1 7.3 3.75Zm-.1 1.9c-.86 0-1.56.7-1.56 1.56v9.58c0 .86.7 1.56 1.56 1.56h9.58c.86 0 1.56-.7 1.56-1.56V7.2c0-.86-.7-1.56-1.56-1.56H7.2Zm10.03 1.43a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 8.38A3.62 3.62 0 1 1 8.38 12 3.62 3.62 0 0 1 12 8.38Zm0 1.9A1.72 1.72 0 1 0 13.72 12 1.72 1.72 0 0 0 12 10.28Z" />
    </svg>
  );
}
