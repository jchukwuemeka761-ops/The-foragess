import React, { useEffect } from 'react';
import { SubheadingPhoto, NAVEDA_SITE } from '../data/navedaData';
import { X, MessageCircle, MapPin } from 'lucide-react';

interface LightboxModalProps {
  photo: SubheadingPhoto | null;
  onClose: () => void;
  atmosphereClass?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
  atmosphereClass = 'atmosphere-ultra'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  const handleWhatsapp = () => {
    const msg = encodeURIComponent(`Hello Naveda World, I am viewing the 4K photo of "${photo.title}" and would like to make an inquiry or reservation.`);
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:bg-neutral-800 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Display */}
        <div className="relative max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src={photo.imageSrc}
            alt={photo.title}
            className={`max-h-[65vh] w-full object-contain ${atmosphereClass}`}
          />
        </div>

        {/* Modal Info Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                  {photo.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-400">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                  {photo.location}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                {photo.title}
              </h3>
              <p className="text-sm text-neutral-300">
                {photo.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsapp}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Reserve / Inquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
