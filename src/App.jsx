import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, ImageModal } from './components';
import AnnouncementPopup from './components/AnnouncementPopup';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const ScanAndOrderPage = lazy(() => import('./pages/ScanAndOrderPage'));
const VddElitePage = lazy(() => import('./pages/VddElitePage'));
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
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
  const MainLayout = () => (
    <>
      <Header
        onOpenOutletModal={goToContact}
      />
      <Outlet />
      <Footer onOpenOutletModal={goToContact} />
    </>
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <ScrollToSection />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone pages — no Header/Footer */}
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/scan-and-order" element={<ScanAndOrderPage />} />
          <Route path="/vdd-elite" element={<VddElitePage />} />

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
