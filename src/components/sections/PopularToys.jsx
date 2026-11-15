import { useTranslation } from 'react-i18next';
import { useToys } from '../../hooks/useToys';
import SectionTitle from '../ui/SectionTitle';
import ToyButton from '../ui/ToyButton';
import ToyCollection from '../catalog/ToyCollection';

export default function PopularToys() {
  const { t } = useTranslation();
  const { status, data, error, retry } = useToys({ popular: true, limit: 4 });

  return (
    <section className="section">
      <SectionTitle eyebrow={t('home.popularEyebrow')} title={t('home.popularTitle')} subtitle={t('home.popularSubtitle')} />
      <ToyCollection status={status} data={data} error={error} onRetry={retry} />
      <div className="mt-14 text-center">
        <ToyButton to="/catalog" variant="lego" color="blue" size="lg">
          {t('home.viewAll')} →
        </ToyButton>
      </div>
    </section>
  );
}
