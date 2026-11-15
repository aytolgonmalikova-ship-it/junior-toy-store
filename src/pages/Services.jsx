import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ServicesGrid from '../components/sections/ServicesGrid';
import CtaBanner from '../components/sections/CtaBanner';

export default function Services() {
  const { t } = useTranslation();
  return (
    <>
      <section className="section">
        <SectionTitle as="h1" eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />
        <ServicesGrid />
      </section>
      <CtaBanner message="gift" />
    </>
  );
}
