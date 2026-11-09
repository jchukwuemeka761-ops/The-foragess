import React, { useState, useEffect } from 'react';
import { SubheadingPhoto, NAVEDA_SITE } from './data/navedaData';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AtmosphereToolbar } from './components/AtmosphereToolbar';
import { LightboxModal } from './components/LightboxModal';
import { ReservationModal } from './components/ReservationModal';
import { AIAssistant } from './components/AIAssistant';
import { HomePage } from './pages/HomePage';
import { RestaurantPage } from './pages/RestaurantPage';
import { SportsPage } from './pages/SportsPage';
import { NightlifePage } from './pages/NightlifePage';
import { MartPage } from './pages/MartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [atmosphereClass, setAtmosphereClass] = useState<string>('atmosphere-ultra');
  const [inspectPhoto, setInspectPhoto] = useState<SubheadingPhoto | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Sync hash routing e.g. #/restaurant or #/admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'restaurant', 'sports', 'nightlife', 'mart', 'about', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Visual Atmosphere Control - shown on consumer pages */}
      {currentPage !== 'admin' && (
        <AtmosphereToolbar
          currentAtmosphere={atmosphereClass}
          onSelect={(preset) => setAtmosphereClass(preset)}
        />
      )}

      {/* Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            atmosphereClass={atmosphereClass}
            onNavigate={handleNavigate}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'restaurant' && (
          <RestaurantPage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
          />
        )}

        {currentPage === 'sports' && (
          <SportsPage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'nightlife' && (
          <NightlifePage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'mart' && (
          <MartPage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            atmosphereClass={atmosphereClass}
            onInspectPhoto={(photo) => setInspectPhoto(photo)}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage onBackToSite={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 24/7 AI Customer Assistant Floating Concierge */}
      <AIAssistant />

      {/* Lightbox Modal for 4K photo inspection */}
      <LightboxModal
        photo={inspectPhoto}
        onClose={() => setInspectPhoto(null)}
        atmosphereClass={atmosphereClass}
      />

      {/* Reservation & Booking Modal */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Floating Action Buttons: WhatsApp & Scroll to top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900/90 text-neutral-300 shadow-xl backdrop-blur-md transition-all hover:bg-neutral-800 hover:text-white hover:scale-110 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        <a
          href={NAVEDA_SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-600/40 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-100" />
            </span>
          </div>
          <span className="hidden sm:inline">WhatsApp Chat (+234 903 977 7679)</span>
        </a>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};
