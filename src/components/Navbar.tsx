import React, { useState } from 'react';
import { NAVEDA_SITE } from '../data/navedaData';
import { Menu, X, Phone, MessageCircle, Clock, MapPin, Sparkles, Lock } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'restaurant', label: 'Bites & Menu (38 Dishes)' },
    { id: 'sports', label: 'Sports & AstroTurf' },
    { id: 'nightlife', label: 'Live Band & Nightlife' },
    { id: 'mart', label: 'Naveda Mart' },
    { id: 'about', label: 'Architecture & About' },
    { id: 'contact', label: 'Contact & Directions' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-neutral-950/90 backdrop-blur-xl transition-all">
      {/* Top micro banner: 24 Hours open & phone */}
      <div className="border-b border-white/5 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40 py-1.5 px-4 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 text-neutral-300">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              Open 24 Hours Daily
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-neutral-300">
              <MapPin className="h-3 w-3 text-amber-400" />
              Okwuta Rd by Ahiaeke Junction, Umuahia
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${NAVEDA_SITE.phoneRaw}`}
              className="flex items-center gap-1 font-semibold text-neutral-200 hover:text-amber-400 transition-colors"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              {NAVEDA_SITE.phoneDisplay}
            </a>
            <a
              href={NAVEDA_SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded bg-emerald-700/80 px-2 py-0.5 font-bold text-white hover:bg-emerald-600 transition-colors text-[11px]"
            >
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-lg shadow-orange-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/assets/aistudio/naveda_logo.png"
              alt="Naveda World Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                NAVEDA WORLD
              </span>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                24H
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-neutral-400">
              Bites & Brews · Sports Arena · Live Band
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Book Now Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
              currentPage === 'admin'
                ? 'bg-amber-500 text-neutral-950 border-amber-400'
                : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-amber-400/50'
            }`}
            title="Admin Entrance & Menu Price Manager"
          >
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden xl:inline">Admin</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Book Experience
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-amber-500/20 bg-neutral-950 px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-neutral-950" />}
                </button>
              );
            })}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-neutral-950 shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Book Experience (AstroTurf / Table)
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
