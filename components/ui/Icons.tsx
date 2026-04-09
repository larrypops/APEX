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
