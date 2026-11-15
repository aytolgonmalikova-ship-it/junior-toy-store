import cloud from '../../assets/cloud.svg';
import { useTheme } from '../../context/ThemeContext';

// Deterministic pseudo-random numbers so the star field is identical on every render.
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const STAR_COLORS = ['#FFFFFF', '#FFE17A', '#FFB3B3', '#8FD8FF', '#CDB4FF'];
const STARS = Array.from({ length: 90 }, (_, i) => ({
  top: rand(i + 1) * 100,
  left: rand(i + 101) * 100,
  size: 1.5 + rand(i + 201) * 3,
  delay: rand(i + 301) * 4,
  duration: 2 + rand(i + 401) * 3,
  color: STAR_COLORS[i % STAR_COLORS.length],
}));

const CLOUDS = [
  { top: '12%', width: 190, duration: '95s', delay: '-20s', opacity: 0.95 },
  { top: '30%', width: 120, duration: '70s', delay: '-50s', opacity: 0.8 },
  { top: '55%', width: 160, duration: '110s', delay: '-80s', opacity: 0.7 },
  { top: '78%', width: 110, duration: '85s', delay: '-5s', opacity: 0.6 },
];

function Night() {
  return (
    <>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {/* Moon */}
      <div className="absolute right-[8%] top-28 h-24 w-24 rounded-full bg-sunny-100 shadow-[0_0_60px_20px_rgba(255,225,122,0.35)] md:h-32 md:w-32">
        <span className="absolute left-[22%] top-[30%] h-5 w-5 rounded-full bg-sunny-200" />
        <span className="absolute left-[55%] top-[55%] h-7 w-7 rounded-full bg-sunny-200" />
        <span className="absolute left-[40%] top-[15%] h-3 w-3 rounded-full bg-sunny-200" />
      </div>
      {/* Shooting star */}
      <span className="absolute right-[10%] top-[12%] h-0.5 w-32 animate-shooting-star rounded-full bg-gradient-to-l from-white to-transparent" />
    </>
  );
}

function Day() {
  return (
    <>
      <div className="absolute -left-10 -top-10 h-44 w-44 md:h-56 md:w-56">
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-[repeating-conic-gradient(rgba(255,210,63,0.35)_0_10deg,transparent_10deg_24deg)]" />
        <div className="absolute inset-[22%] rounded-full bg-sunny-300 shadow-[0_0_60px_rgba(255,194,26,0.7)]" />
      </div>
      {CLOUDS.map((c, i) => (
        <img
          key={i}
          src={cloud}
          alt=""
          className="absolute left-0 animate-drift"
          style={{ top: c.top, width: c.width, opacity: c.opacity, animationDuration: c.duration, animationDelay: c.delay }}
        />
      ))}
    </>
  );
}

/** Fixed decorative sky behind the whole app: sunny day or starry night. */
export default function SkyBackdrop() {
  const { isDark } = useTheme();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b from-skyblue-200 via-[#FFF3D6] to-cream transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute inset-0 bg-gradient-to-b from-night-950 via-night-900 to-grape-900 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      {isDark ? <Night /> : <Day />}
    </div>
  );
}
