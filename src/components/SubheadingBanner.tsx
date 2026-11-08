import React from 'react';
import { SubheadingPhoto, NAVEDA_SITE } from '../data/navedaData';
import { Maximize2, MessageCircle, ArrowRight } from 'lucide-react';

interface SubheadingBannerProps {
  photo: SubheadingPhoto;
  atmosphereClass?: string;
  onInspect?: (photo: SubheadingPhoto) => void;
  ctaText?: string;
  ctaAction?: () => void;
  reverse?: boolean;
}

export const SubheadingBanner: React.FC<SubheadingBannerProps> = ({
  photo,
  atmosphereClass = 'atmosphere-ultra',
  onInspect,
  ctaText,
  ctaAction,
  reverse = false
}) => {
  const accentClasses = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
  }[photo.accent] || 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  const defaultWhatsappCta = () => {
    const text = encodeURIComponent(`Hello Naveda World, I am inquiring about "${photo.title}" at ${photo.location}.`);
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="subheading-bg-container group relative my-8 overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900 shadow-2xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10">
      {/* Background Image: Vivid, Bright & Highly Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={photo.imageSrc}
          alt={photo.title}
          className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${atmosphereClass}`}
          loading="lazy"
        />
        {/* Carefully calibrated overlay: Preserves vibrant photography while ensuring ultra-clear typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20 sm:bg-gradient-to-r sm:from-neutral-950/90 sm:via-neutral-950/60 sm:to-transparent" />
        <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
      </div>

      {/* Content Container */}
      <div className={`relative z-10 flex min-h-[360px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-10 lg:min-h-[460px] lg:p-12 ${reverse ? 'sm:items-end sm:text-right' : 'sm:items-start sm:text-left'}`}>
        <div className="max-w-2xl space-y-4">
          {/* Badge & Location */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${accentClasses}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {photo.badge}
            </span>
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-md">
              📍 {photo.location}
            </span>
          </div>

          {/* Subheading Title */}
          <h3 className="text-photo-heading font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {photo.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-photo-sub max-w-xl text-sm leading-relaxed text-neutral-200 sm:text-base">
            {photo.subtitle}
          </p>

          {/* Feature Highlights Pills */}
          {photo.highlights && photo.highlights.length > 0 && (
            <div className={`flex flex-wrap gap-2 pt-1 ${reverse ? 'sm:justify-end' : ''}`}>
              {photo.highlights.map((h, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-neutral-900/80 px-2.5 py-1 text-xs font-semibold text-neutral-200 border border-white/10 backdrop-blur-md"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className={`flex flex-wrap items-center gap-3 pt-3 ${reverse ? 'sm:justify-end' : ''}`}>
            {ctaText ? (
              <button
                type="button"
                onClick={ctaAction || defaultWhatsappCta}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-400 hover:scale-105 active:scale-95"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={defaultWhatsappCta}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Book via WhatsApp
              </button>
            )}

            {onInspect && (
              <button
                type="button"
                onClick={() => onInspect(photo)}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900/80 px-4 py-2.5 text-sm font-semibold text-neutral-200 border border-white/20 backdrop-blur-md transition-all hover:bg-neutral-800 hover:text-white hover:border-amber-400/50"
              >
                <Maximize2 className="h-4 w-4 text-amber-400" />
                Inspect 4K View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
