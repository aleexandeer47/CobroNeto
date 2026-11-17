export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 text-[17px] font-semibold tracking-tight">
      <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="text-accent">
        <rect x="1" y="1" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M5 11.5h8M5 8h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
      CobroNeto
    </span>
  );
}
