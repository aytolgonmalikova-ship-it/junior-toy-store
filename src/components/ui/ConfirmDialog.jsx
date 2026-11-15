import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import ToyButton from './ToyButton';

export default function ConfirmDialog({ open, title, text, confirmLabel, onConfirm, onCancel, emoji = '⚠️' }) {
  const { t } = useTranslation();
  return (
    <Modal open={open} title={title} onClose={onCancel} size="sm">
      <div className="text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-coral-100 text-4xl dark:bg-coral-500/20" aria-hidden="true">
          {emoji}
        </span>
        <p className="mt-5 text-lg font-semibold text-slate-600 dark:text-indigo-200">{text}</p>
        <div className="mt-8 flex flex-col-reverse justify-center gap-4 sm:flex-row">
          <ToyButton color="blue" onClick={onCancel}>
            {t('admin.confirm.cancel')}
          </ToyButton>
          <ToyButton color="coral" onClick={onConfirm}>
            {confirmLabel ?? t('admin.confirm.confirm')}
          </ToyButton>
        </div>
      </div>
    </Modal>
  );
}
