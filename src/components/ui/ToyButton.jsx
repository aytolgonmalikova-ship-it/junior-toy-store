import { Link } from 'react-router-dom';

const COLORS = {
  yellow: '[--face:#FFD23F] [--edge:#D99A00] text-night-900',
  blue: '[--face:#34AFFF] [--edge:#1574C2] text-white',
  mint: '[--face:#3DD6A0] [--edge:#1E9C72] text-night-900',
  coral: '[--face:#F9575E] [--edge:#C23A47] text-white',
  grape: '[--face:#9B6BFF] [--edge:#6A3FD6] text-white',
  whatsapp: '[--face:#25D366] [--edge:#128C7E] text-white',
};

const SIZES = {
  sm: { box: 'px-4 py-2.5 text-sm', round: 'rounded-2xl' },
  md: { box: 'px-6 py-3 text-base', round: 'rounded-2xl' },
  lg: { box: 'px-7 py-4 text-lg', round: 'rounded-3xl' },
  xl: { box: 'px-8 py-5 text-xl sm:text-2xl', round: 'rounded-[2rem]' },
};

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-45 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">
      <path d="M12 2c3 2 4.5 5.5 4 10l-1.5 4h-5L8 12C7.5 7.5 9 4 12 2z" fill="#fff" stroke="#2D2250" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="1.8" fill="#5EC4FF" stroke="#2D2250" strokeWidth="1.2" />
      <path d="M8.5 13 5.5 16.5l3.5-.5M15.5 13l3 3.5-3.5-.5" fill="#FFC21A" stroke="#2D2250" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10.5 17h3l-1.5 4z" fill="#FFC21A" className="origin-top animate-pulse" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[144deg] group-hover:scale-110" aria-hidden="true">
      <path d="M12 2.5l2.8 6 6.5.6-4.9 4.4 1.5 6.4L12 16.6 6.1 19.9l1.5-6.4L2.7 9.1l6.5-.6z" fill="#FFE17A" stroke="#2D2250" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function Decorations({ variant }) {
  if (variant === 'lego') {
    return (
      <span aria-hidden="true" className="pointer-events-none absolute -top-2.5 inset-x-5 flex justify-around">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3 w-6 rounded-t-lg bg-[var(--face)] shadow-[inset_0_3px_0_rgba(255,255,255,0.45)]" />
        ))}
      </span>
    );
  }
  if (variant === 'bear') {
    return (
      <>
        {['left-1', 'right-1'].map((side) => (
          <span key={side} aria-hidden="true" className={`pointer-events-none absolute -top-3 ${side} grid h-8 w-8 place-items-center rounded-full bg-[var(--face)]`}>
            <span className="h-3.5 w-3.5 rounded-full bg-white/50" />
          </span>
        ))}
      </>
    );
  }
  return null;
}

/**
 * Toy-styled button. Renders a router <Link> (`to`), an external <a> (`href`) or a <button>.
 * Variants: squeaky (round pill), lego (studs on top), bear (ears), rocket, star.
 */
export default function ToyButton({
  variant = 'squeaky',
  color = 'yellow',
  size = 'md',
  to,
  href,
  icon,
  children,
  className = '',
  ...rest
}) {
  const sizing = SIZES[size] ?? SIZES.md;
  const shape = variant === 'squeaky' ? 'rounded-full' : sizing.round;
  const classes = `btn-toy group ${COLORS[color] ?? COLORS.yellow} ${sizing.box} ${shape} ${className}`;

  const content = (
    <>
      <Decorations variant={variant} />
      <span className="relative inline-flex items-center gap-2">
        {variant === 'rocket' && <RocketIcon />}
        {variant === 'star' && <StarIcon />}
        {icon}
        <span>{children}</span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
