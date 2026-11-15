/** Labelled form field with optional hint and error message. */
export default function Field({ id, label, hint, error, className = '', children, aside }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-end justify-between gap-2">
        <label htmlFor={id} className="block text-sm font-extrabold text-slate-700 dark:text-indigo-100">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-bold text-coral-600 dark:text-coral-300">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs font-semibold text-slate-500 dark:text-indigo-300/80">{hint}</p>
      )}
    </div>
  );
}
