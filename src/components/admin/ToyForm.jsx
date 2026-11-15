import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../config/site';
import { AGE_OPTIONS, ILLUSTRATIONS } from '../../services/toysStore';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import ToyCard from '../catalog/ToyCard';
import ToyButton from '../ui/ToyButton';
import Field from './Field';

const EMPTY = {
  name: { ru: '', kg: '', en: '' },
  category: 'plush',
  price: '',
  age: '3+',
  image: '',
  illustration: '/toys/gift.svg',
  popular: false,
};

const toFormValues = (toy) =>
  toy
    ? {
        name: { ru: toy.name?.ru ?? '', kg: toy.name?.kg ?? '', en: toy.name?.en ?? '' },
        category: toy.category,
        price: String(toy.price),
        age: toy.age,
        image: toy.image ?? '',
        illustration: toy.illustration ?? '/toys/gift.svg',
        popular: Boolean(toy.popular),
      }
    : structuredClone(EMPTY);

const isHttpUrl = (value) => /^https?:\/\/\S+$/i.test(value);

/** Add / edit form for a toy with a live card preview. */
export default function ToyForm({ toy, onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(() => toFormValues(toy));
  const [errors, setErrors] = useState({});
  const previewImage = useDebouncedValue(values.image.trim(), 400);

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };
  const setName = (lang, value) => {
    setValues((v) => ({ ...v, name: { ...v.name, [lang]: value } }));
    if (lang === 'ru') setErrors((e) => ({ ...e, nameRu: undefined }));
  };

  const autofill = () =>
    setValues((v) => ({
      ...v,
      name: { ru: v.name.ru, kg: v.name.kg.trim() || v.name.ru, en: v.name.en.trim() || v.name.ru },
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = Number(values.price);
    const image = values.image.trim();
    const nextErrors = {};
    if (!values.name.ru.trim()) nextErrors.nameRu = t('admin.toyForm.errors.nameRu');
    if (!Number.isFinite(price) || price <= 0) nextErrors.price = t('admin.toyForm.errors.price');
    if (image && !isHttpUrl(image)) nextErrors.image = t('admin.toyForm.errors.image');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const ru = values.name.ru.trim();
    onSubmit({
      name: { ru, kg: values.name.kg.trim() || ru, en: values.name.en.trim() || ru },
      category: values.category,
      price: Math.round(price),
      age: values.age,
      image,
      illustration: values.illustration,
      popular: values.popular,
    });
  };

  const previewToy = {
    _id: 'preview',
    name: {
      ru: values.name.ru || t('admin.toyForm.previewName'),
      kg: values.name.kg || values.name.ru || t('admin.toyForm.previewName'),
      en: values.name.en || values.name.ru || t('admin.toyForm.previewName'),
    },
    category: values.category,
    price: Number(values.price) > 0 ? Math.round(Number(values.price)) : 0,
    age: values.age,
    image: isHttpUrl(previewImage) ? previewImage : '',
    illustration: values.illustration,
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_17rem]">
      <div className="space-y-5">
        <fieldset className="space-y-3 rounded-3xl bg-sunny-50 p-4 dark:bg-night-900/60">
          <legend className="sr-only">{t('admin.toyForm.names')}</legend>
          <Field id="toy-name-ru" label={t('admin.toyForm.nameRu')} error={errors.nameRu}>
            <input
              id="toy-name-ru"
              className="input-toy"
              value={values.name.ru}
              onChange={(e) => setName('ru', e.target.value)}
              aria-invalid={Boolean(errors.nameRu)}
              aria-describedby={errors.nameRu ? 'toy-name-ru-error' : undefined}
              lang="ru"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="toy-name-kg" label={t('admin.toyForm.nameKg')}>
              <input id="toy-name-kg" className="input-toy" value={values.name.kg} onChange={(e) => setName('kg', e.target.value)} lang="ky" />
            </Field>
            <Field id="toy-name-en" label={t('admin.toyForm.nameEn')}>
              <input id="toy-name-en" className="input-toy" value={values.name.en} onChange={(e) => setName('en', e.target.value)} lang="en" />
            </Field>
          </div>
          <button
            type="button"
            onClick={autofill}
            disabled={!values.name.ru.trim()}
            title={t('admin.toyForm.autofillHint')}
            className="btn-mini bg-white text-grape-700 shadow-sm hover:bg-grape-50 dark:bg-night-800 dark:text-grape-200"
          >
            ✨ {t('admin.toyForm.autofill')}
          </button>
          <p className="text-xs font-semibold text-slate-500 dark:text-indigo-300/80">{t('admin.toyForm.autofillHint')}</p>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="toy-category" label={t('admin.toyForm.category')}>
            <select id="toy-category" className="input-toy" value={values.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.filter((c) => c !== 'all').map((c) => (
                <option key={c} value={c}>
                  {t(`catalog.categories.${c}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field id="toy-price" label={t('admin.toyForm.price')} error={errors.price}>
            <input
              id="toy-price"
              type="number"
              inputMode="numeric"
              min="1"
              step="10"
              className="input-toy"
              value={values.price}
              onChange={(e) => set('price', e.target.value)}
              aria-invalid={Boolean(errors.price)}
              aria-describedby={errors.price ? 'toy-price-error' : undefined}
            />
          </Field>
          <Field id="toy-age" label={t('admin.toyForm.age')}>
            <select id="toy-age" className="input-toy" value={values.age} onChange={(e) => set('age', e.target.value)}>
              {AGE_OPTIONS.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="toy-image" label={t('admin.toyForm.image')} hint={t('admin.toyForm.imageHint')} error={errors.image}>
          <input
            id="toy-image"
            type="url"
            inputMode="url"
            placeholder="https://images.unsplash.com/photo-…"
            className="input-toy"
            value={values.image}
            onChange={(e) => set('image', e.target.value)}
            aria-invalid={Boolean(errors.image)}
            aria-describedby={errors.image ? 'toy-image-error' : undefined}
          />
        </Field>

        <fieldset>
          <legend className="mb-2 text-sm font-extrabold text-slate-700 dark:text-indigo-100">{t('admin.toyForm.illustration')}</legend>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
            {ILLUSTRATIONS.map((src) => {
              const active = values.illustration === src;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => set('illustration', src)}
                  aria-pressed={active}
                  aria-label={src.replace('/toys/', '').replace('.svg', '')}
                  className={`grid aspect-square place-items-center rounded-2xl p-1.5 transition hover:-translate-y-0.5 ${
                    active
                      ? 'bg-grape-100 ring-4 ring-grape-400 dark:bg-grape-500/30'
                      : 'bg-slate-50 ring-2 ring-slate-200 hover:ring-grape-300 dark:bg-night-900 dark:ring-night-600'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain" />
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-mint-50 p-4 font-bold text-slate-700 dark:bg-mint-500/10 dark:text-indigo-100">
          <input
            type="checkbox"
            checked={values.popular}
            onChange={(e) => set('popular', e.target.checked)}
            className="h-6 w-6 shrink-0 accent-grape-500"
          />
          ⭐ {t('admin.toyForm.popular')}
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm font-extrabold text-slate-700 dark:text-indigo-100">👀 {t('admin.toyForm.preview')}</p>
        <div className="pointer-events-none select-none lg:sticky lg:top-0" aria-hidden="true" inert="">
          <ToyCard toy={previewToy} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 border-t-2 border-dashed border-sunny-200 pt-6 sm:flex-row sm:justify-end lg:col-span-2 dark:border-night-600">
        <ToyButton color="blue" onClick={onCancel}>
          {t('admin.toyForm.cancel')}
        </ToyButton>
        <ToyButton type="submit" variant="lego" color="mint">
          💾 {toy ? t('admin.toyForm.save') : t('admin.toyForm.create')}
        </ToyButton>
      </div>
    </form>
  );
}
