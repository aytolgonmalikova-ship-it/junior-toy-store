import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { DEFAULT_ADMINS } from '../../services/adminsStore';
import ToyButton from '../ui/ToyButton';
import Field from './Field';
import RoleBadge, { StatusBadge } from './RoleBadge';

const AVATAR_BG = { super: 'bg-sunny-300', admin: 'bg-skyblue-200' };

export default function AdminLogin() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [values, setValues] = useState({ login: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [shake, setShake] = useState(false);

  const attempt = (loginValue, password) => {
    const result = login(loginValue, password);
    if (!result.ok) {
      setError(result.error);
      setShake(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    attempt(values.login, values.password);
  };

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setError(null);
  };

  return (
    <section className="mx-auto grid max-w-5xl items-start gap-8 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-[1.1fr_1fr]">
      <form
        onSubmit={onSubmit}
        onAnimationEnd={() => setShake(false)}
        noValidate
        className={`card-toy relative p-6 sm:p-10 ${shake ? 'animate-[wiggle_0.25s_ease-in-out_2]' : ''}`}
      >
        <span aria-hidden="true" className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-2xl bg-grape-500 text-3xl shadow-[0_5px_0_#5E35BF]">
          🔐
        </span>
        <h1 className="mt-4 text-center font-display text-3xl text-grape-700 sm:text-4xl dark:text-white">{t('admin.login.title')}</h1>
        <p className="mt-2 text-center font-semibold text-slate-600 dark:text-indigo-200">{t('admin.login.subtitle')}</p>

        <div className="mt-8 space-y-5">
          <Field id="admin-login" label={t('admin.login.login')}>
            <input
              id="admin-login"
              name="login"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              value={values.login}
              onChange={onChange}
              aria-invalid={Boolean(error)}
              className="input-toy"
              placeholder="superadmin"
            />
          </Field>
          <Field id="admin-password" label={t('admin.login.password')}>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={values.password}
                onChange={onChange}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'admin-login-error' : undefined}
                className="input-toy pr-14"
                placeholder="••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t('admin.login.hide') : t('admin.login.show')}
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-xl transition hover:bg-slate-100 dark:hover:bg-white/10"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </Field>
        </div>

        {error && (
          <p id="admin-login-error" role="alert" className="mt-5 rounded-2xl bg-coral-100 px-4 py-3 text-center font-bold text-coral-700 dark:bg-coral-500/20 dark:text-coral-200">
            {t(`admin.login.errors.${error}`)}
          </p>
        )}

        <div className="mt-8 text-center">
          <ToyButton type="submit" variant="star" color="grape" size="lg" className="w-full sm:w-auto">
            {t('admin.login.submit')}
          </ToyButton>
        </div>
        <p className="mt-5 text-center text-xs font-bold text-slate-500 dark:text-indigo-300/80">🕒 {t('admin.login.sessionNote')}</p>
      </form>

      <aside className="rounded-[2rem] border-2 border-dashed border-grape-300 bg-white/70 p-6 backdrop-blur sm:p-8 dark:border-grape-500/50 dark:bg-night-800/70">
        <h2 className="text-xl font-black text-grape-700 dark:text-sunny-200">⚡ {t('admin.login.demoTitle')}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-indigo-200">{t('admin.login.demoHint')}</p>
        <ul className="mt-5 space-y-3">
          {DEFAULT_ADMINS.map((admin) => (
            <li key={admin.id}>
              <button
                type="button"
                onClick={() => attempt(admin.login, admin.password)}
                className="group flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[0_4px_0_rgba(45,34,80,0.08)] ring-2 ring-transparent transition hover:-translate-y-0.5 hover:ring-grape-300 active:translate-y-0.5 dark:bg-night-900 dark:hover:ring-grape-500"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${AVATAR_BG[admin.role]}`} aria-hidden="true">
                  {admin.role === 'super' ? '👑' : '🛡️'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-night-900 dark:text-white">{admin.name}</span>
                    <RoleBadge role={admin.role} size="sm" />
                    {admin.status !== 'active' && <StatusBadge status={admin.status} />}
                  </span>
                  <span className="mt-0.5 block font-mono text-sm text-slate-500 dark:text-indigo-300">
                    {admin.login} · {admin.password}
                  </span>
                </span>
                <span aria-hidden="true" className="text-xl transition group-hover:translate-x-1">→</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs font-semibold text-slate-500 dark:text-indigo-300/80">ℹ️ {t('admin.login.demoWarning')}</p>
      </aside>
    </section>
  );
}
