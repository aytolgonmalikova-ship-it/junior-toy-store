import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from '../ui/Loader';
import Header from './Header';
import Footer from './Footer';
import SkyBackdrop from './SkyBackdrop';
import ScrollToTop from './ScrollToTop';
import WhatsAppFab from './WhatsAppFab';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const isAdmin = useLocation().pathname.startsWith('/admin');

  useEffect(() => {
    document.title = isAdmin ? t('admin.metaTitle') : t('meta.title');
  }, [t, i18n.resolvedLanguage, isAdmin]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <SkyBackdrop />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Loader label={t('loading.page')} className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFab />}
    </div>
  );
}
