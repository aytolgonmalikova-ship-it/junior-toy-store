import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useAdminsList } from '../../hooks/useStores';
import { addAdmin, deleteAdmin, resetAdmins, updateAdmin } from '../../services/adminsStore';
import AdminForm from '../../components/admin/AdminForm';
import RoleBadge, { StatusBadge } from '../../components/admin/RoleBadge';
import { useToast } from '../../components/admin/Toast';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ToyButton from '../../components/ui/ToyButton';

const LOCALES = { ru: 'ru-RU', kg: 'ky-KG', en: 'en-GB' };

function Locked() {
  const { t } = useTranslation();
  return (
    <div className="card-toy mx-auto max-w-lg p-10 text-center">
      <span className="text-6xl" aria-hidden="true">🔒</span>
      <h2 className="mt-4 text-2xl font-black text-night-900 dark:text-white">{t('admin.admins.lockedTitle')}</h2>
      <p className="mt-2 font-semibold text-slate-600 dark:text-indigo-200">{t('admin.admins.lockedText')}</p>
      <ToyButton to="/admin" color="grape" className="mt-6">
        📦 {t('admin.admins.back')}
      </ToyButton>
    </div>
  );
}

export default function AdminsPanel() {
  const { t, i18n } = useTranslation();
  const { currentAdmin, isSuper } = useAuth();
  const admins = useAdminsList();
  const notify = useToast();
  const [editing, setEditing] = useState(null); // null | 'new' | admin
  const [confirm, setConfirm] = useState(null); // null | { type: 'delete', admin } | { type: 'reset' }

  if (!isSuper) return <Locked />;

  const formatDate = (iso) =>
    new Intl.DateTimeFormat(LOCALES[i18n.resolvedLanguage] ?? 'ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));

  const handleSubmit = (data) => {
    if (editing === 'new') {
      addAdmin(data);
      notify(t('admin.toast.adminCreated'));
    } else {
      // Never let the current super admin demote or block themselves.
      const patch = editing.id === currentAdmin.id ? { ...data, role: 'super', status: 'active' } : data;
      updateAdmin(editing.id, patch);
      notify(t('admin.toast.adminSaved'));
    }
    setEditing(null);
  };

  const toggleStatus = (admin) => {
    updateAdmin(admin.id, { status: admin.status === 'active' ? 'blocked' : 'active' });
    notify(t('admin.toast.statusChanged'), 'info');
  };

  const handleConfirm = () => {
    if (confirm.type === 'delete') {
      deleteAdmin(confirm.admin.id);
      notify(t('admin.toast.adminDeleted'), 'info');
    } else {
      resetAdmins();
      notify(t('admin.toast.adminsReset'), 'info');
    }
    setConfirm(null);
  };

  return (
    <div className="card-toy p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-grape-700 dark:text-white">{t('admin.admins.title')}</h2>
          <p className="mt-1 font-semibold text-slate-600 dark:text-indigo-200">{t('admin.admins.subtitle')}</p>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setConfirm({ type: 'reset' })}
            className="btn-mini h-11 bg-slate-100 px-4 text-slate-700 hover:bg-slate-200 dark:bg-night-900 dark:text-indigo-100"
          >
            ♻️ {t('admin.admins.reset')}
          </button>
          <ToyButton variant="bear" color="yellow" onClick={() => setEditing('new')}>
            ➕ {t('admin.admins.add')}
          </ToyButton>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {admins.map((admin) => {
          const isSelf = admin.id === currentAdmin.id;
          const blocked = admin.status !== 'active';
          return (
            <li
              key={admin.id}
              className={`flex flex-col rounded-3xl p-5 ring-2 transition ${
                isSelf ? 'bg-sunny-50 ring-sunny-300 dark:bg-sunny-500/10 dark:ring-sunny-500/40' : 'bg-slate-50 ring-transparent dark:bg-night-900/70'
              } ${blocked ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-black ${
                    admin.role === 'super' ? 'bg-sunny-300 text-night-900' : 'bg-skyblue-200 text-skyblue-700'
                  } ${blocked ? 'grayscale' : ''}`}
                  aria-hidden="true"
                >
                  {admin.name.trim().charAt(0).toUpperCase() || '?'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-black text-night-900 dark:text-white">
                    <span className="truncate">{admin.name}</span>
                    {isSelf && <span className="rounded-full bg-grape-500 px-2 py-0.5 text-[0.65rem] font-black text-white">{t('admin.admins.you')}</span>}
                  </p>
                  <p className="truncate font-mono text-sm text-slate-500 dark:text-indigo-300">@{admin.login}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <RoleBadge role={admin.role} size="sm" />
                <StatusBadge status={admin.status} />
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-indigo-300/80">
                🕒 {admin.lastLoginAt ? t('admin.admins.lastLogin', { date: formatDate(admin.lastLoginAt) }) : t('admin.admins.never')}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <button type="button" onClick={() => setEditing(admin)} className="btn-mini bg-skyblue-100 text-skyblue-700 hover:bg-skyblue-200 dark:bg-skyblue-500/20 dark:text-skyblue-200">
                  ✏️ {t('admin.admins.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(admin)}
                  disabled={isSelf}
                  title={isSelf ? t('admin.admins.selfHint') : undefined}
                  className={`btn-mini ${
                    blocked
                      ? 'bg-mint-100 text-mint-700 hover:bg-mint-200 dark:bg-mint-500/20 dark:text-mint-200'
                      : 'bg-sunny-100 text-sunny-700 hover:bg-sunny-200 dark:bg-sunny-500/20 dark:text-sunny-200'
                  }`}
                >
                  {blocked ? `🔓 ${t('admin.admins.unblock')}` : `⛔ ${t('admin.admins.block')}`}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirm({ type: 'delete', admin })}
                  disabled={isSelf}
                  aria-label={t('admin.admins.delete')}
                  title={isSelf ? t('admin.admins.selfHint') : t('admin.admins.delete')}
                  className="btn-mini bg-coral-100 text-coral-700 hover:bg-coral-200 dark:bg-coral-500/20 dark:text-coral-200"
                >
                  🗑️
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-center text-sm font-semibold text-slate-500 dark:text-indigo-300/80">
        🔐 {t('admin.admins.selfHint')} · <Link to="/admin" className="font-black text-grape-600 underline dark:text-sunny-200">{t('admin.admins.back')}</Link>
      </p>

      <Modal open={editing !== null} title={editing === 'new' ? t('admin.adminForm.addTitle') : t('admin.adminForm.editTitle')} onClose={() => setEditing(null)}>
        {editing !== null && (
          <AdminForm
            key={editing === 'new' ? 'new' : editing.id}
            admin={editing === 'new' ? null : editing}
            isSelf={editing !== 'new' && editing.id === currentAdmin.id}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={confirm !== null}
        emoji={confirm?.type === 'reset' ? '♻️' : '🗑️'}
        title={confirm?.type === 'reset' ? t('admin.confirm.resetAdminsTitle') : t('admin.confirm.deleteAdminTitle')}
        text={confirm?.type === 'reset' ? t('admin.confirm.resetAdminsText') : t('admin.confirm.deleteAdminText', { name: confirm?.admin?.name ?? '' })}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
