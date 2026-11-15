import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOGIN_PATTERN, ROLES, STATUSES, isLoginTaken } from '../../services/adminsStore';
import ToyButton from '../ui/ToyButton';
import Field from './Field';

/** Create / edit an administrator. `isSelf` locks role & status so the super admin can't lock themselves out. */
export default function AdminForm({ admin, isSelf, onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    name: admin?.name ?? '',
    login: admin?.login ?? '',
    password: '',
    role: admin?.role ?? 'admin',
    status: admin?.status ?? 'active',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = t('admin.adminForm.errors.name');
    if (!LOGIN_PATTERN.test(values.login.trim())) next.login = t('admin.adminForm.errors.login');
    else if (isLoginTaken(values.login, admin?.id)) next.login = t('admin.adminForm.errors.loginTaken');
    if ((!admin || values.password) && values.password.length < 4) next.password = t('admin.adminForm.errors.password');
    setErrors(next);
    if (Object.keys(next).length) return;

    const data = { name: values.name.trim(), login: values.login.trim().toLowerCase(), role: values.role, status: values.status };
    if (values.password) data.password = values.password;
    onSubmit(data);
  };

  const err = (field) => ({ 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `adm-${field}-error` : undefined });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field id="adm-name" label={t('admin.adminForm.name')} error={errors.name}>
        <input id="adm-name" className="input-toy" value={values.name} onChange={set('name')} autoComplete="off" {...err('name')} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="adm-login" label={t('admin.adminForm.login')} hint={t('admin.adminForm.loginHint')} error={errors.login}>
          <input
            id="adm-login"
            className="input-toy font-mono"
            value={values.login}
            onChange={set('login')}
            autoCapitalize="none"
            spellCheck="false"
            autoComplete="off"
            {...err('login')}
          />
        </Field>
        <Field
          id="adm-password"
          label={t('admin.adminForm.password')}
          hint={admin ? t('admin.adminForm.passwordKeep') : t('admin.adminForm.passwordHint')}
          error={errors.password}
        >
          <div className="relative">
            <input
              id="adm-password"
              type={showPassword ? 'text' : 'password'}
              className="input-toy pr-14 font-mono"
              value={values.password}
              onChange={set('password')}
              autoComplete="new-password"
              {...err('password')}
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="adm-role" label={t('admin.adminForm.role')} hint={isSelf ? t('admin.admins.selfHint') : undefined}>
          <select id="adm-role" className="input-toy" value={values.role} onChange={set('role')} disabled={isSelf}>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role === 'super' ? '👑' : '🛡️'} {t(`admin.roles.${role}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field id="adm-status" label={t('admin.adminForm.status')}>
          <select id="adm-status" className="input-toy" value={values.status} onChange={set('status')} disabled={isSelf}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === 'active' ? '🟢' : '⛔'} {t(`admin.status.${status}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex flex-col-reverse gap-4 border-t-2 border-dashed border-sunny-200 pt-6 sm:flex-row sm:justify-end dark:border-night-600">
        <ToyButton color="blue" onClick={onCancel}>
          {t('admin.adminForm.cancel')}
        </ToyButton>
        <ToyButton type="submit" variant="lego" color="mint">
          💾 {admin ? t('admin.adminForm.save') : t('admin.adminForm.create')}
        </ToyButton>
      </div>
    </form>
  );
}
