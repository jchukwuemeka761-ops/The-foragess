import React from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_PITCH_PACKAGES,
  NAVEDA_BILLIARDS_DETAILS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { useNavedaData } from '../context/DataContext';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  Trophy,
  Users,
  MessageCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SportsPageProps {
  atmosphereClass: string;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
  onOpenBooking: () => void;
}

export const SportsPage: React.FC<SportsPageProps> = ({
  atmosphereClass,
  onInspectPhoto,
  onOpenBooking
}) => {
  const { pitchPackages } = useNavedaData();
  const handlePitchBooking = (packageName: string) => {
    const text = encodeURIComponent(
      `Hello Naveda World Sports Arena, I would like to book a 5-a-side pitch session for: *${packageName}*. Please let me know available slots.`
    );
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Pitch Subheading Banner: The Arena 5-A-Side AstroTurf */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.cleanTurfPitch}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve AstroTurf Pitch Now"
          ctaAction={onOpenBooking}
        />
      </div>

      {/* AstroTurf Packages Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 pb-10">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
            All-Weather Synthetic Turf
          </span>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            5-A-Side Match Rates & Packages
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Professional-grade striped synthetic turf pitch equipped with high-tensile perimeter safety nets, match footballs, and high-illumination LED floodlights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(pitchPackages && pitchPackages.length > 0 ? pitchPackages : NAVEDA_PITCH_PACKAGES).map((pkg) => (
            <div
              key={pkg.id}
              className="relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    {pkg.badge}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    {pkg.time}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {pkg.title}
                  </h3>
                  <div className="mt-2 text-2xl font-black text-emerald-400 font-display">
                    {pkg.rate}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  {pkg.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handlePitchBooking(pkg.title)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book This Slot on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Billiards Subheading Banner: Champions Billiards Lounge (naveda2222_ebc5846d.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.poolVines}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve Billiards Table on WhatsApp"
          ctaAction={onOpenBooking}
          reverse
        />
      </section>

      {/* Billiards Details */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {NAVEDA_BILLIARDS_DETAILS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 space-y-3 backdrop-blur-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
                ★
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Terrace Subheading Banner: Open-Air Terrace Games (naveda_22_aaf946fe.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.poolTerrace}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Book Terrace Lounge Session"
          ctaAction={onOpenBooking}
        />
      </section>
    </div>
  );
};
