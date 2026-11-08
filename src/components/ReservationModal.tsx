import React, { useState } from 'react';
import { NAVEDA_SITE } from '../data/navedaData';
import { X, Send, Calendar, Clock, User, Phone, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialType = 'Dining & Lounge'
}) => {
  const [bookingType, setBookingType] = useState(initialType);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      `*Naveda World Reservation Request*`,
      `• *Booking Type*: ${bookingType}`,
      `• *Name*: ${guestName || 'Valued Guest'}`,
      `• *Phone*: ${phone || 'N/A'}`,
      `• *Date*: ${date || 'Today/Soon'}`,
      `• *Time*: ${time || 'Anytime'}`,
      `• *Guests/Party Size*: ${guestsCount}`,
      specialRequests ? `• *Special Notes*: ${specialRequests}` : ''
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(details);
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-neutral-900 p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1 pb-4">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            Instant 24/7 Booking
          </span>
          <h3 className="font-display text-2xl font-bold text-white pt-1">
            Reserve Your Experience
          </h3>
          <p className="text-xs text-neutral-400">
            Guaranteed slot with instant WhatsApp confirmation from our host team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-300">Experience / Venue Area</label>
            <select
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="5-A-Side AstroTurf Pitch Slot">The Arena: 5-A-Side AstroTurf Pitch Slot</option>
              <option value="VIP Highlife Live Band Table">VIP Stage: Weekend Live Highlife Band</option>
              <option value="Fine Dining & Pan-African Bites">Fine Dining Restaurant & Native Bites</option>
              <option value="Champions Billiards & Snooker Table">Champions Billiards & Snooker Lounge</option>
              <option value="Executive Private Lounge / Event">Executive Private Lounge / Event Booking</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-amber-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Chief Emeka"
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-amber-400" /> WhatsApp / Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-amber-400" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-2.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" /> Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-2.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300">Guests</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-2.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4-6">4 - 6 People</option>
                <option value="10 (5-a-side Match)">10 Match Players</option>
                <option value="15+ Group Feast">15+ Group Feast</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300">Special Notes or Match Details</label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Birthday champagne toast, floodlit pitch requirements, native soup preferences..."
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            Send Reservation to Naveda WhatsApp (+234 903 977 7679)
          </button>
        </form>
      </div>
    </div>
  );
};
