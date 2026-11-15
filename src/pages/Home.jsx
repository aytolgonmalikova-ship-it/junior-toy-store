import { useTranslation } from 'react-i18next';
import Hero from '../components/sections/Hero';
import PopularToys from '../components/sections/PopularToys';
import ServicesGrid from '../components/sections/ServicesGrid';
import CtaBanner from '../components/sections/CtaBanner';
import SectionTitle from '../components/ui/SectionTitle';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <PopularToys />
      <section className="section">
        <SectionTitle eyebrow={t('home.servicesEyebrow')} title={t('home.servicesTitle')} subtitle={t('home.servicesSubtitle')} />
        <ServicesGrid />
      </section>
      <CtaBanner />
    </>
  );
}
