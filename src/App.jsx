import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, ImageModal } from './components';
import AnnouncementPopup from './components/AnnouncementPopup';
import MobileActionBar from './components/MobileActionBar';
import { ELITE_ENABLED } from './config/features';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const ScanAndOrderPage = lazy(() => import('./pages/ScanAndOrderPage'));
const EliteCalculatorPage = lazy(() => import('./pages/EliteCalculatorPage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const RefundPage = lazy(() => import('./pages/RefundPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nepal-red"></div>
  </div>
);

const ScrollToSection = () => {
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) return;
    // Retry until the lazy-loaded page has rendered the target section
    // (QR/redirect landings race the HomePage chunk on cold loads).
    let tries = 0;
    let timer;
    const attempt = () => {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (++tries < 80) {
        timer = setTimeout(attempt, 100);
      }
    };
    attempt();
    return () => clearTimeout(timer);
  }, [state]);
  return null;
};

const AppContent = () => {
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  // "Order Now" navigates to /contact — no external redirect
  const goToContact = () => navigate('/contact');

  const openImageModal = (url) => {
    setModalImageUrl(url);
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => setIsImageModalOpen(false);

  // Layout for main site pages (with Header + Footer)
  // Header is fixed — dark pages (/ and /menu) draw under it; light pages get top padding.
  const MainLayout = () => {
    const { pathname } = useLocation();
    const darkPage = pathname === '/' || pathname === '/menu';
    return (
      <>
        <Header
          onOpenOutletModal={goToContact}
        />
        <div className={darkPage ? '' : 'pt-16 sm:pt-20 bg-gray-50'}>
          <Outlet />
        </div>
        <Footer onOpenOutletModal={goToContact} />
        <MobileActionBar />
      </>
    );
  };

  return (
    <div className="font-sans text-gray-800 bg-ink min-h-screen flex flex-col">
      <ScrollToSection />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone pages — no Header/Footer */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/scan-and-order" element={<ScanAndOrderPage />} />
          {/* Standalone guided Elite calculator — the QR-code landing page.
              While Elite is disabled, QR scans and old links land on the homepage. */}
          <Route path="/vdd-elite" element={ELITE_ENABLED ? <EliteCalculatorPage /> : <Navigate to="/" replace />} />
          <Route path="/calculator" element={<Navigate to={ELITE_ENABLED ? '/vdd-elite' : '/'} replace />} />

          {/* Main site pages — with Header + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={
              <>
                <HomePage
                  openModal={openImageModal}
                  onOpenOutletModal={goToContact}
                />
                <AnnouncementPopup />
              </>
            } />
            <Route path="/menu" element={<MenuPage onOpenOutletModal={goToContact} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage onOpenOutletModal={goToContact} />} />
            {/* Policy pages */}
            <Route path="/terms"    element={<TermsPage />} />
            <Route path="/privacy"  element={<PrivacyPage />} />
            <Route path="/refund"   element={<RefundPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/contact"  element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageUrl={modalImageUrl}
      />
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;
