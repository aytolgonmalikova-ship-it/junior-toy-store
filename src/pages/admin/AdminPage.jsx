import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from '../../components/admin/AdminLogin';
import RoleBadge from '../../components/admin/RoleBadge';
import { ToastProvider } from '../../components/admin/Toast';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import Loader from '../../components/ui/Loader';

const tabClass = ({ isActive }) =>
  `chip-toy ${
    isActive
      ? 'bg-grape-500 text-white [--edge:#5E35BF]'
      : 'bg-white text-slate-700 hover:text-grape-600 dark:bg-night-800 dark:text-indigo-100 dark:hover:text-sunny-200'
  }`;

export default function AdminPage() {
  const { t } = useTranslation();
  const { currentAdmin, isSuper, logout } = useAuth();

  if (!currentAdmin) return <AdminLogin />;

  return (
    <ToastProvider>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="card-toy flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${isSuper ? 'bg-sunny-300' : 'bg-skyblue-200'}`} aria-hidden="true">
              {isSuper ? '👑' : '🛡️'}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-black text-night-900 sm:text-2xl dark:text-white">
                {t('admin.header.hello', { name: currentAdmin.name })}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <RoleBadge role={currentAdmin.role} />
                <span className="font-mono text-sm text-slate-500 dark:text-indigo-300">@{currentAdmin.login}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher className="flex sm:hidden" />
            <button
              type="button"
              onClick={logout}
              className="btn-mini h-11 bg-coral-100 px-4 text-coral-700 hover:bg-coral-200 dark:bg-coral-500/20 dark:text-coral-200 dark:hover:bg-coral-500/30"
            >
              🚪 {t('admin.header.logout')}
            </button>
          </div>
        </div>

        <nav aria-label={t('admin.tabs.label')} className="no-scrollbar -mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 sm:mx-0 sm:px-0">
          <NavLink to="/admin" end className={tabClass}>
            📦 {t('admin.tabs.products')}
          </NavLink>
          {isSuper && (
            <NavLink to="/admin/team" className={tabClass}>
              👥 {t('admin.tabs.admins')}
            </NavLink>
          )}
        </nav>

        <div className="mt-6">
          <Suspense fallback={<Loader label={t('loading.page')} />}>
            <Outlet />
          </Suspense>
        </div>

        <p className="mt-10 text-center text-xs font-bold text-slate-500 dark:text-indigo-300/80">💾 {t('admin.demoNote')}</p>
      </section>
    </ToastProvider>
  );
}
