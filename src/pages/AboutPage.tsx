import React from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  Sparkles,
  Maximize2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Award
} from 'lucide-react';

interface AboutPageProps {
  atmosphereClass: string;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  atmosphereClass,
  onInspectPhoto
}) => {
  const photoList = Object.values(NAVEDA_PHOTOS);

  return (
    <div className="space-y-16 pb-20">
      {/* Subheading Banner: Architectural Complex */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.buildingExterior}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Inquire on Private Venue Booking"
        />
      </div>

      {/* Narrative & Story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
              The Naveda Vision
            </span>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              An Iconic Lifestyle Complex in the Heart of Abia State
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <p>
                Strategically situated at Okwuta Road by Ahiaeke Junction in Umuahia, Naveda World Bites And Brews was designed as a modern beacon of hospitality, sporting recreation, and Igbo cultural entertainment.
              </p>
              <p>
                From the signature orange architectural styling and reflective glass curtain walls of our multi-level building to the lush indoor greenery of our Champions Billiards lounge, every square meter has been carefully crafted for comfort and prestige.
              </p>
              <p>
                Our culinary philosophy celebrates authentic Eastern flavors — from piping hot Ofe Nsala white soup with river catfish and mortar-served Nkwobi to smoky firewood party jollof rice and crispy Atlantic jumbo prawns.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
                <span className="font-display text-2xl font-black text-amber-400">100%</span>
                <p className="text-xs text-neutral-400 font-medium">Authentic Igbo Highlife & Bites</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
                <span className="font-display text-2xl font-black text-emerald-400">24/7</span>
                <p className="text-xs text-neutral-400 font-medium">Safe, Guarded & Open Round the Clock</p>
              </div>
            </div>
          </div>

          {/* Feature Pillars */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Award className="h-5 w-5" />
                <span>Architectural Distinction</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Modern corporate lines paired with warm ambient indoor lighting and tropical alfresco terraces create an inviting atmosphere day and night.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="h-5 w-5" />
                <span>Premier Sporting Turf</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The all-weather synthetic AstroTurf pitch and dual billiards zones offer corporate leagues, casual athletes, and friends a world-class playground.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <ShieldCheck className="h-5 w-5" />
                <span>Full Security & Concierge</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Armed 24/7 security, well-illuminated paved parking, standby power generators, and hospitable staff make every visit effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL AUTHENTIC 6-PHOTO 4K GALLERY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 pb-10">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
            Verified Photography
          </span>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Venue Gallery & Architecture
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Explore all 6 official, verified photos of the Naveda World complex. Click any photo to inspect in full 4K high resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photoList.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onInspectPhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${atmosphereClass}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute top-3 left-3 rounded-lg bg-black/80 px-2.5 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md border border-amber-500/30">
                  {photo.badge}
                </div>
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-display text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {photo.subtitle}
                </p>
                <p className="text-[11px] text-neutral-400 pt-1">
                  📍 {photo.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
