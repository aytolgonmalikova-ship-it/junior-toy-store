import { useEffect, useRef, useState } from 'react';

/**
 * Product photo with a shimmering placeholder while it loads and a cartoon
 * illustration as a fallback if the photo can't be loaded.
 */
export default function ToyImage({ src, fallback, alt, emoji, className = '' }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const imgRef = useRef(null);

  // Reset when the source changes; cached images may already be complete before onLoad is attached.
  useEffect(() => {
    const img = imgRef.current;
    if (!src) setStatus('error');
    else if (img?.complete && img.naturalWidth > 0) setStatus('loaded');
    else setStatus('loading');
  }, [src]);

  if (status === 'error' || !src) {
    return (
      <div className={`grid h-full w-full place-items-center ${className}`}>
        {fallback ? (
          <img src={fallback} alt={alt} className="h-3/4 w-3/4 object-contain drop-shadow-[0_14px_14px_rgba(45,34,80,0.25)] transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <span className="text-6xl" role="img" aria-label={alt}>{emoji}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {status === 'loading' && (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)]" />
          <span className="animate-bounce text-5xl opacity-70">{emoji}</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        width="600"
        height="600"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
