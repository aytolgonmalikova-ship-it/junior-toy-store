import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const ProductsPanel = lazy(() => import('./pages/admin/ProductsPanel'));
const AdminsPanel = lazy(() => import('./pages/admin/AdminsPanel'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="admin" element={<AdminPage />}>
            <Route index element={<ProductsPanel />} />
            <Route path="team" element={<AdminsPanel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
