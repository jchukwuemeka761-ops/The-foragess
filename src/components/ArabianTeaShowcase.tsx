import React from 'react';
import { NAVEDA_ARABIAN_TEA, NAVEDA_SITE } from '../data/navedaData';
import { Coffee, Sparkles, MessageCircle, Maximize2, Check, Clock, Flame, ShieldCheck } from 'lucide-react';

interface ArabianTeaShowcaseProps {
  atmosphereClass?: string;
  onInspectPhoto?: (item: any) => void;
}

export const ArabianTeaShowcase: React.FC<ArabianTeaShowcaseProps> = ({
  atmosphereClass = 'atmosphere-ultra',
  onInspectPhoto
}) => {
  const tea = NAVEDA_ARABIAN_TEA;

  const handleOrderTea = (varietyName?: string) => {
    const text = encodeURIComponent(
      varietyName
        ? `Hello Naveda World, I would like to order the Arabian Tea Service: "${varietyName}".`
        : `Hello Naveda World, I would like to reserve the Royal Arabian Tea Service at Naveda World Bites and Brews.`
    );
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                {tea.badge}
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                {tea.hours}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white pt-2">
              {tea.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl pt-1">
              {tea.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOrderTea()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-xs font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Order Arabian Tea Service
            </button>
          </div>
        </div>

        {/* Main Split Layout: AI Equipment Photo & Brewing Story */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4K AI-Generated Arabian Tea Equipment Image */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-black shadow-xl">
              <img
                src={tea.imageSrc}
                alt="Authentic Arabian Tea Drinking Equipment at Naveda World"
                className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 hd-ai-clarity ${atmosphereClass}`}
                loading="lazy"
              />
              
              {/* Overlay with 4K Inspect button */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="rounded-lg bg-black/80 px-2.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  🏺 Authentic Arabian Tea Service
                </span>
                <span className="rounded-lg bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  4K AI High-Definition
                </span>
              </div>

              {onInspectPhoto && (
                <button
                  type="button"
                  onClick={() => onInspectPhoto({
                    title: 'Authentic Arabian Tea Equipment Service',
                    imageSrc: tea.imageSrc,
                    subtitle: 'Hand-engraved silver and brass Dallah teapot, gold-filigree Istikana glasses, cinnamon sticks, cardamom pods, fresh mint and Arabian dates.',
                    badge: 'Beverage Craftsmanship',
                    location: 'VIP Tea Lounge & Terrace · Naveda Complex'
                  })}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-neutral-900/90 border border-amber-400/50 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md hover:bg-neutral-800 transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                  Inspect 4K Equipment
                </button>
              )}
            </div>

            {/* Equipment Breakdown Pills */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tea.equipmentDetails.map((eq, i) => (
                <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3 space-y-1">
                  <p className="font-display text-xs font-bold text-amber-300">
                    {eq.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    {eq.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Varieties & Heritage */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-500/20 bg-neutral-950/70 p-5 space-y-2.5">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-amber-400" />
                  Quality Arabian Tea Experience at Naveda World
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Stepping into Naveda World Bites and Brews means experiencing world-class hospitality. Alongside our 38 Pan-African culinary dishes, our bar masters brew genuine Arabian tea following authentic Middle Eastern brewing traditions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Pure saffron & cardamom pods</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Fresh garden spearmint leaves</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Imported Ceylon & Moroccan green tea</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Served with sweet dates & cinnamon</span>
                  </div>
                </div>
              </div>

              {/* Varieties Menu */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Select an Arabian Tea Pot Service
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tea.varieties.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => handleOrderTea(v.name)}
                      className="group cursor-pointer rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {v.badge && (
                            <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider">
                              {v.badge}
                            </span>
                          )}
                          <h5 className="font-display text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                            {v.name}
                          </h5>
                        </div>
                        <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                          {v.price}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="rounded-xl border border-white/5 bg-neutral-950/50 p-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Brewed fresh to order in front of guests upon request.</span>
              </div>
              <button
                type="button"
                onClick={() => handleOrderTea()}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline shrink-0"
              >
                Inquire on WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
