import React, { useEffect, useState } from 'react';
import { SubheadingPhoto, MenuItem, NAVEDA_SITE } from '../data/navedaData';
import { X, MessageCircle, MapPin, Sparkles, ZoomIn, ZoomOut, Check, Flame, Clock } from 'lucide-react';

export type InspectableItem = SubheadingPhoto | MenuItem | {
  title: string;
  imageSrc: string;
  subtitle?: string;
  badge?: string;
  location?: string;
  price?: string;
  portion?: string;
  prepTime?: string;
  spicyLevel?: string;
  ingredients?: string[];
};

interface LightboxModalProps {
  item: InspectableItem | null;
  onClose: () => void;
  atmosphereClass?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  atmosphereClass = 'atmosphere-ultra'
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  // Normalize item data
  const isDish = 'price' in item || 'category' in item;
  const imageSrc = 'image' in item ? (item as MenuItem).image : ('imageSrc' in item ? (item as SubheadingPhoto).imageSrc : (item as any).imageSrc);
  const title = 'name' in item ? (item as MenuItem).name : ('title' in item ? (item as SubheadingPhoto).title : (item as any).title);
  const description = 'description' in item ? (item as MenuItem).description : ('subtitle' in item ? (item as SubheadingPhoto).subtitle : '');
  const badge = item.badge || (isDish ? '4K Ultra HD Dish' : 'Architectural Landmark');
  const price = isDish ? (item as MenuItem).price : undefined;
  const portion = isDish ? (item as MenuItem).portion : undefined;
  const prepTime = isDish ? (item as MenuItem).prepTime : undefined;
  const spicyLevel = isDish ? (item as MenuItem).spicyLevel : undefined;
  const ingredients = isDish ? (item as MenuItem).ingredients : undefined;
  const location = 'location' in item ? (item as SubheadingPhoto).location : 'Naveda World Complex · Okwuta Rd, Umuahia';

  const handleWhatsapp = () => {
    if (isDish) {
      const msg = encodeURIComponent(`Hello Naveda World, I am viewing the 4K Ultra HD photo of "${title}" (${price}) and would like to order.`);
      window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${msg}`, '_blank');
    } else {
      const msg = encodeURIComponent(`Hello Naveda World, I am viewing the 4K photo of "${title}" at ${location} and would like to make an inquiry or reservation.`);
      window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-5 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-neutral-900 shadow-2xl ring-1 ring-white/10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/80 px-6 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                4K Ultra HD Visual Inspector
              </span>
              <span className="hidden sm:inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                AI Studio High-Definition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="flex items-center gap-1.5 rounded-xl bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
              title={isZoomed ? 'Zoom out' : 'Zoom in to full 4K'}
            >
              {isZoomed ? <ZoomOut className="h-3.5 w-3.5 text-amber-400" /> : <ZoomIn className="h-3.5 w-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isZoomed ? 'Fit Screen' : 'Full Zoom'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* High Definition Image Display Container */}
        <div className={`relative flex-1 overflow-auto bg-black flex items-center justify-center p-2 sm:p-4 min-h-[300px] max-h-[62vh] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
             onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={imageSrc}
            alt={title}
            className={`transition-all duration-300 ${atmosphereClass} ${
              isZoomed
                ? 'max-h-none w-auto max-w-none scale-125 object-cover'
                : 'max-h-[58vh] w-full max-w-4xl object-contain'
            }`}
            style={{
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
        </div>

        {/* Modal Info Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 p-5 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                  {badge}
                </span>
                {spicyLevel && (
                  <span className="rounded-full bg-red-950/80 px-2.5 py-0.5 text-xs font-bold text-red-300 border border-red-500/30 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-red-400" />
                    {spicyLevel}
                  </span>
                )}
                {portion && (
                  <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                    🥣 {portion}
                  </span>
                )}
                {prepTime && (
                  <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-neutral-400" />
                    {prepTime}
                  </span>
                )}
                {!isDish && (
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    {location}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-xl font-black text-white sm:text-2xl">
                  {title}
                </h3>
                {price && (
                  <span className="font-display text-xl font-black text-amber-400">
                    {price}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {description}
              </p>

              {ingredients && ingredients.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-neutral-400">Ingredients:</span>
                  {ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-300 border border-neutral-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={handleWhatsapp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                {isDish ? 'Order this Dish on WhatsApp' : 'Reserve / Inquire via WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
