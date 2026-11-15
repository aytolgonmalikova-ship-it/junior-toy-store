import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, CATEGORY_STYLES } from '../../config/site';
import { addToy, deleteToy, resetToys, updateToy } from '../../services/toysStore';
import { useAdminsList, useToysList } from '../../hooks/useStores';
import { formatPrice } from '../../components/catalog/ToyCard';
import ToyImage from '../../components/catalog/ToyImage';
import StatCards from '../../components/admin/StatCards';
import ToyForm from '../../components/admin/ToyForm';
import { useToast } from '../../components/admin/Toast';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ToyButton from '../../components/ui/ToyButton';

function Thumb({ toy, name }) {
  const style = CATEGORY_STYLES[toy.category] ?? CATEGORY_STYLES.all;
  return (
    <div className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-night-900/5 dark:ring-white/10 ${style.stage}`}>
      <ToyImage src={toy.image} fallback={toy.illustration} alt={name} emoji={style.emoji} />
    </div>
  );
}

function RowActions({ onEdit, onDelete, t }) {
  return (
    <div className="flex justify-end gap-2">
      <button type="button" onClick={onEdit} className="btn-mini bg-skyblue-100 text-skyblue-700 hover:bg-skyblue-200 dark:bg-skyblue-500/20 dark:text-skyblue-200">
        ✏️ <span className="hidden sm:inline">{t('admin.products.edit')}</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label={t('admin.products.delete')}
        title={t('admin.products.delete')}
        className="btn-mini bg-coral-100 text-coral-700 hover:bg-coral-200 dark:bg-coral-500/20 dark:text-coral-200"
      >
        🗑️
      </button>
    </div>
  );
}

export default function ProductsPanel() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  const toys = useToysList();
  const admins = useAdminsList();
  const notify = useToast();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState(null); // null | 'new' | toy
  const [confirm, setConfirm] = useState(null); // null | { type: 'delete', toy } | { type: 'reset' }

  const currency = t('catalog.currency');
  const nameOf = (toy) => toy.name?.[lang] || toy.name?.ru || '';

  const stats = useMemo(() => {
    const avg = toys.length ? Math.round(toys.reduce((sum, toy) => sum + toy.price, 0) / toys.length) : 0;
    return [
      { key: 'toys', label: t('admin.stats.toys'), value: toys.length, emoji: '🧸', tone: 'coral' },
      { key: 'categories', label: t('admin.stats.categories'), value: new Set(toys.map((toy) => toy.category)).size, emoji: '🗂️', tone: 'mint' },
      { key: 'avg', label: t('admin.stats.avgPrice'), value: formatPrice(avg, currency), emoji: '💰', tone: 'sunny' },
      { key: 'admins', label: t('admin.stats.activeAdmins'), value: admins.filter((a) => a.status === 'active').length, emoji: '🛡️', tone: 'sky' },
    ];
  }, [toys, admins, t, currency]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return toys.filter(
      (toy) =>
        (category === 'all' || toy.category === category) &&
        (!q || Object.values(toy.name ?? {}).some((n) => n.toLowerCase().includes(q))),
    );
  }, [toys, query, category]);

  const handleSubmit = (data) => {
    if (editing === 'new') {
      addToy(data);
      notify(t('admin.toast.toyCreated'));
    } else {
      updateToy(editing._id, data);
      notify(t('admin.toast.toySaved'));
    }
    setEditing(null);
  };

  const handleConfirm = () => {
    if (confirm.type === 'delete') {
      deleteToy(confirm.toy._id);
      notify(t('admin.toast.toyDeleted'), 'info');
    } else {
      resetToys();
      notify(t('admin.toast.toysReset'), 'info');
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-8">
      <StatCards items={stats} />

      <div className="card-toy p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-black text-grape-700 dark:text-white">{t('admin.products.title')}</h2>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setConfirm({ type: 'reset' })}
              className="btn-mini h-11 bg-slate-100 px-4 text-slate-700 hover:bg-slate-200 dark:bg-night-900 dark:text-indigo-100"
            >
              ♻️ {t('admin.products.reset')}
            </button>
            <ToyButton variant="lego" color="mint" onClick={() => setEditing('new')}>
              ➕ {t('admin.products.add')}
            </ToyButton>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_17rem]">
          <label className="relative block">
            <span className="sr-only">{t('admin.products.search')}</span>
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('admin.products.search')}
              className="input-toy pl-11"
            />
          </label>
          <label className="block">
            <span className="sr-only">{t('admin.toyForm.category')}</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-toy">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_STYLES[c].emoji} {c === 'all' ? t('admin.products.allCategories') : t(`catalog.categories.${c}`)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm font-bold text-slate-500 dark:text-indigo-300" aria-live="polite">
          {t('admin.products.count', { shown: filtered.length, total: toys.length })}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-3xl bg-sunny-50 p-10 text-center text-lg font-bold text-slate-600 dark:bg-night-900 dark:text-indigo-200">
            🔎 {t('admin.products.empty')}
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-indigo-300">
                    <th className="px-3 py-2">{t('admin.products.columns.photo')}</th>
                    <th className="px-3 py-2">{t('admin.products.columns.name')}</th>
                    <th className="px-3 py-2">{t('admin.products.columns.category')}</th>
                    <th className="px-3 py-2">{t('admin.products.columns.age')}</th>
                    <th className="px-3 py-2 text-right">{t('admin.products.columns.price')}</th>
                    <th className="px-3 py-2 text-right">{t('admin.products.columns.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((toy) => {
                    const style = CATEGORY_STYLES[toy.category] ?? CATEGORY_STYLES.all;
                    return (
                      <tr key={toy._id} className="bg-slate-50 transition hover:bg-sunny-50 dark:bg-night-900/70 dark:hover:bg-night-900">
                        <td className="rounded-l-2xl px-3 py-2">
                          <Thumb toy={toy} name={nameOf(toy)} />
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-black text-night-900 dark:text-white">
                            {toy.name?.ru}
                            {toy.popular && <span className="ml-2 rounded-full bg-sunny-300 px-2 py-0.5 text-[0.65rem] font-black text-night-900">⭐ {t('admin.products.popular')}</span>}
                          </p>
                          <p className="text-xs font-semibold text-slate-500 dark:text-indigo-300">
                            <span lang="ky">KG: {toy.name?.kg}</span> · <span lang="en">EN: {toy.name?.en}</span>
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-extrabold ${style.chip}`}>
                            {style.emoji} {t(`catalog.categories.${toy.category}`)}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-bold text-slate-600 dark:text-indigo-200">{toy.age}</td>
                        <td className="whitespace-nowrap px-3 py-2 text-right font-black text-coral-600 dark:text-sunny-300">{formatPrice(toy.price, currency)}</td>
                        <td className="rounded-r-2xl px-3 py-2">
                          <RowActions t={t} onEdit={() => setEditing(toy)} onDelete={() => setConfirm({ type: 'delete', toy })} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="mt-4 space-y-3 md:hidden">
              {filtered.map((toy) => {
                const style = CATEGORY_STYLES[toy.category] ?? CATEGORY_STYLES.all;
                return (
                  <li key={toy._id} className="rounded-3xl bg-slate-50 p-3 dark:bg-night-900/70">
                    <div className="flex gap-3">
                      <Thumb toy={toy} name={nameOf(toy)} />
                      <div className="min-w-0 flex-1">
                        <p className="font-black leading-snug text-night-900 dark:text-white">
                          {toy.popular && '⭐ '}
                          {nameOf(toy)}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold">
                          <span className={`rounded-full px-2 py-0.5 ${style.chip}`}>
                            {style.emoji} {t(`catalog.categories.${toy.category}`)}
                          </span>
                          <span className="text-slate-500 dark:text-indigo-300">🎂 {toy.age}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-lg font-black text-coral-600 dark:text-sunny-300">{formatPrice(toy.price, currency)}</span>
                      <RowActions t={t} onEdit={() => setEditing(toy)} onDelete={() => setConfirm({ type: 'delete', toy })} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <p className="mt-6 text-center text-sm font-bold">
          <Link to="/catalog" className="text-grape-600 underline decoration-wavy underline-offset-4 hover:text-coral-500 dark:text-sunny-200">
            🛍️ {t('admin.products.viewInShop')}
          </Link>
        </p>
      </div>

      <Modal
        open={editing !== null}
        title={editing === 'new' ? t('admin.toyForm.addTitle') : t('admin.toyForm.editTitle')}
        onClose={() => setEditing(null)}
        size="lg"
      >
        {editing !== null && (
          <ToyForm key={editing === 'new' ? 'new' : editing._id} toy={editing === 'new' ? null : editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        )}
      </Modal>

      <ConfirmDialog
        open={confirm !== null}
        emoji={confirm?.type === 'reset' ? '♻️' : '🗑️'}
        title={confirm?.type === 'reset' ? t('admin.confirm.resetToysTitle') : t('admin.confirm.deleteToyTitle')}
        text={confirm?.type === 'reset' ? t('admin.confirm.resetToysText') : t('admin.confirm.deleteToyText', { name: confirm ? nameOf(confirm.toy) : '' })}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
