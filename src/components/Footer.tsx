import React from 'react';
import { NAVEDA_SITE } from '../data/navedaData';
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-amber-500/20 bg-neutral-950 pt-16 pb-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-md ring-1 ring-white/20 overflow-hidden">
                <img
                  src="/assets/aistudio/naveda_logo.png"
                  alt="Naveda World Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-display text-lg font-extrabold text-white">
                  NAVEDA WORLD
                </span>
                <p className="text-[11px] text-amber-400 font-medium">Bites & Brews · Sports · Live Music</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-neutral-300">
              Umuahia’s premier multi-experience landmark. Serving world-class Pan-African bites, 38 spectacular dishes, an all-weather 5-a-side AstroTurf arena, Champions Billiards lounge, and authentic weekend live highlife bands.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              24/7 Monitored Secure Complex
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Location & Hours
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{NAVEDA_SITE.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{NAVEDA_SITE.hours}</span>
              </p>
            </div>
            <div className="pt-2">
              <a
                href={NAVEDA_SITE.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-neutral-950 transition-all"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Instant Contact */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Instant Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${NAVEDA_SITE.phoneRaw}`}
                className="flex items-center gap-2 text-neutral-200 hover:text-amber-400 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-700">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span>{NAVEDA_SITE.phoneDisplay}</span>
              </a>
              <a
                href={NAVEDA_SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-200 hover:text-emerald-400 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-700">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Experience Sections
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('restaurant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Pan-African Menu & 38 Unique Dishes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('sports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  → The Arena 5-A-Side AstroTurf Pitch
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('sports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Champions Billiards & Snooker Lounge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('nightlife'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Weekend Live Highlife Band & VIP Lounge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('mart'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Naveda Mart & Shopping Mall
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Naveda World Bites And Brews. All rights reserved. Okwuta Road by Ahiaeke Junction, Umuahia, Abia State.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-500/80 font-medium">Ready for Netlify Static Deployment</span>
            <span>•</span>
            <span className="text-neutral-400">Open 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
