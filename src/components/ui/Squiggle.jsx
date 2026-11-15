export default function Squiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 160 16" className={className} fill="none" aria-hidden="true">
      <path d="M3 10 Q13 2 23 10 T43 10 T63 10 T83 10 T103 10 T123 10 T143 10 T158 9" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
