import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, OutletSelectionModal, ImageModal } from './components';
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
  const [cart, setCart] = useState([]);
  const [isOutletModalOpen, setIsOutletModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  // --- Cart Logic ---
  const addToCart = (item, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + quantity) }
            : cartItem
        ).filter(cartItem => cartItem.quantity > 0);
      } else {
        if (quantity > 0) {
          return [...prevCart, { ...item, quantity }];
        }
        return prevCart;
      }
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Modal Handlers ---
  const openOutletModal = () => setIsOutletModalOpen(true);
  const closeOutletModal = () => setIsOutletModalOpen(false);

  const openImageModal = (url) => {
    setModalImageUrl(url);
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => setIsImageModalOpen(false);

  const handleOutletSelect = (outlet) => {
    console.log(`User selected outlet: ${outlet}`);
  };

  // Layout for main site pages (with Header + Footer)
  const MainLayout = () => (
    <>
      <Header
        cartItemCount={cartItemCount}
        onOpenOutletModal={openOutletModal}
      />
      <Outlet />
      <Footer onOpenOutletModal={openOutletModal} />
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
                  onOpenOutletModal={openOutletModal}
                />
                <AnnouncementPopup />
              </>
            } />
            <Route path="/menu" element={<MenuPage onOpenOutletModal={openOutletModal} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage onOpenOutletModal={openOutletModal} />} />
            {/* Policy pages */}
            <Route path="/terms"    element={<TermsPage />} />
            <Route path="/privacy"  element={<PrivacyPage />} />
            <Route path="/refund"   element={<RefundPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/contact"  element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Modals */}
      <OutletSelectionModal
        isOpen={isOutletModalOpen}
        onClose={closeOutletModal}
        onSelectOutlet={handleOutletSelect}
      />

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
