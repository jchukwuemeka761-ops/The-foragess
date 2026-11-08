import React, { useState } from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  ExternalLink,
  ShieldCheck,
  Navigation
} from 'lucide-react';

interface ContactPageProps {
  atmosphereClass: string;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  atmosphereClass,
  onInspectPhoto
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      `*Naveda World Website Inquiry*`,
      `• *From*: ${name || 'Valued Guest'}`,
      `• *Phone*: ${phone || 'N/A'}`,
      `• *Topic*: ${subject}`,
      `• *Message*: ${message}`
    ].join('\n');

    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent(details)}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Subheading Banner: Grand Entrance & Arrival */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.entranceSignage}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Contact Front Desk on WhatsApp"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Details & Cards */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                Get In Touch
              </span>
              <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
                Location & Reservations
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300">
                We are open 24 hours daily. Reach out directly for table reservations, 5-a-side pitch bookings, private event hosting, or general inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <a
                href={`tel:${NAVEDA_SITE.phoneRaw}`}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-3 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    24/7 Telephone Line
                  </p>
                  <p className="font-display text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {NAVEDA_SITE.phoneDisplay}
                  </p>
                </div>
                <p className="text-xs text-neutral-400">Click to call front desk</p>
              </a>

              {/* WhatsApp Card */}
              <a
                href={NAVEDA_SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-3 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    WhatsApp Concierge
                  </p>
                  <p className="font-display text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    +234 903 977 7679
                  </p>
                </div>
                <p className="text-xs text-neutral-400">Instant chat & bookings</p>
              </a>

              {/* Address Card */}
              <div className="sm:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">Physical Address</h3>
                    <p className="text-xs text-neutral-400">Naveda World Complex, Abia State, Nigeria</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-200">
                  {NAVEDA_SITE.address}
                </p>
                <p className="text-xs text-amber-400 font-semibold">
                  Landmark: {NAVEDA_SITE.landmark} (Plus Code: {NAVEDA_SITE.plusCode})
                </p>
                <div className="pt-2">
                  <a
                    href={NAVEDA_SITE.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Open in Google Maps App
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Inquiry Form */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="space-y-1 pb-6 border-b border-neutral-800">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                Direct Dispatch
              </span>
              <h2 className="font-display text-2xl font-bold text-white pt-2">
                Send Direct Inquiry
              </h2>
              <p className="text-xs text-neutral-400">
                Our managers reply promptly via WhatsApp (+234 903 977 7679).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Obinna Nwachukwu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Your Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="5-A-Side AstroTurf Pitch Reservation">5-A-Side AstroTurf Pitch Reservation</option>
                  <option value="VIP Live Highlife Band Table Booking">VIP Live Highlife Band Table Booking</option>
                  <option value="Pan-African Restaurant & Dining Order">Pan-African Restaurant & Dining Order</option>
                  <option value="Champions Billiards & Snooker Tournament">Champions Billiards & Snooker Tournament</option>
                  <option value="Corporate / Wedding Reception Hall">Corporate / Wedding Reception Hall</option>
                  <option value="Naveda Mart Cookware & Grocery Inquiry">Naveda Mart Cookware & Grocery Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us your date, expected number of guests, or special requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Dispatch Inquiry to Naveda WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
