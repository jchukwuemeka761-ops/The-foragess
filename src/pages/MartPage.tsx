import React from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_MART_HIGHLIGHTS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  ShoppingBag,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  Truck
} from 'lucide-react';

interface MartPageProps {
  atmosphereClass: string;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
}

export const MartPage: React.FC<MartPageProps> = ({
  atmosphereClass,
  onInspectPhoto
}) => {
  const handleInquireMartItem = (itemTitle: string, price: string) => {
    const text = encodeURIComponent(
      `Hello Naveda Mart & Shopping Mall, I would like to inquire about purchasing *${itemTitle}* (${price}). Please let me know stock availability.`
    );
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Subheading Banner: Grand Entrance, Naveda Mart & Reception */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.entranceSignage}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Order Mart Items on WhatsApp"
        />
      </div>

      {/* Featured Mart Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 pb-10">
          <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/30">
            Shopping Mall & Supermarket
          </span>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Premium Cookware & Provisions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Shop high-quality African culinary essentials, professional kitchenware, household items, beverages, and daily groceries right inside the Naveda Complex.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NAVEDA_MART_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 backdrop-blur-xl transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase">
                    {item.category}
                  </span>
                  <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300 border border-orange-500/30">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-800 flex items-center justify-between">
                <span className="font-display text-lg font-black text-amber-400">
                  {item.price}
                </span>

                <button
                  type="button"
                  onClick={() => handleInquireMartItem(item.name, item.price)}
                  className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mart Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 sm:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-white">Open 24/7 Everyday</h4>
                <p className="text-xs text-neutral-300">
                  Need midnight groceries, cooking spices, or emergency kitchen utensils? Naveda Mart stays open around the clock.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Truck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-white">Umuahia City Delivery</h4>
                <p className="text-xs text-neutral-300">
                  Direct dispatch to homes, offices, and venues within Umuahia. Order quickly via our WhatsApp concierge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-white">Authentic Genuine Goods</h4>
                <p className="text-xs text-neutral-300">
                  All cookware, provisions, and native kitchen items are sourced from certified manufacturers and skilled local artisans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
