import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, OutletSelectionModal, ImageModal } from './components';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

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

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <ScrollToSection />
      {/* Header is now rendered inside pages or here if common. 
          Since BlogPage has its own Header/Footer structure in the code I wrote earlier, 
          I should probably remove Header/Footer from here OR remove them from BlogPage.
          
          Wait, BlogPage.jsx has <Header /> and <Footer /> inside it.
          But HomePage.jsx usually doesn't include Header/Footer if App.jsx did.
          
          Let's check HomePage.jsx content. 
          If HomePage.jsx DOES NOT have Header, I should keep Header here but conditionally render it?
          Or better, let's make Header common here and remove it from BlogPage.jsx.
          
          Actually, let's keep it simple. I'll wrap Routes with Header and Footer here, 
          and I will need to REMOVE Header/Footer from BlogPage.jsx and BlogPostPage.jsx 
          in a subsequent step to avoid duplication.
      */}

      {/* 
         DECISION: I will render Header/Footer here for all pages. 
         I will need to edit BlogPage and BlogPostPage to remove their internal Header/Footer.
      */}
      <Header
        cartItemCount={cartItemCount}
        onOpenOutletModal={openOutletModal}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <HomePage
              openModal={openImageModal}
              onOpenOutletModal={openOutletModal}
            />
          } />
          {/* <Route path="/menu" element={
            <MenuPage
              cart={cart}
              onAddToCart={addToCart}
              onOpenOutletModal={openOutletModal}
            />
          } /> */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage onOpenOutletModal={openOutletModal} />} />
        </Routes>
      </Suspense>

      <Footer onOpenOutletModal={openOutletModal} />

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
