import React, { useState } from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { useNavedaData } from '../context/DataContext';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  ShieldCheck,
  Clock,
  MapPin,
  Flame,
  Award,
  Maximize2
} from 'lucide-react';

interface HomePageProps {
  atmosphereClass: string;
  onNavigate: (page: string) => void;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  atmosphereClass,
  onNavigate,
  onInspectPhoto,
  onOpenBooking
}) => {
  const { dishes } = useNavedaData();
  const [activeMenuTab, setActiveMenuTab] = useState<'all' | 'native' | 'mains' | 'seafood'>('all');

  const heroPhoto = NAVEDA_PHOTOS.buildingExterior;

  const filteredDishes = dishes.filter((dish) => {
    if (activeMenuTab === 'all') return true;
    return dish.category === activeMenuTab;
  }).slice(0, 8); // Showcase 8 featured items with quick link to all dishes

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION: Uses naveda_1111_bd081ad6.jpeg as the crystal-clear home background image */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-amber-500/20">
        {/* Crystal Clear Home Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroPhoto.imageSrc}
            alt={heroPhoto.title}
            className={`h-full w-full object-cover object-center ${atmosphereClass} transition-transform duration-1000 scale-100`}
            priority="true"
          />
          {/* Subtle balanced overlay to guarantee text legibility while keeping the orange architecture vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-neutral-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-6">
            {/* Logo Brand Pill */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-2xl shadow-orange-500/30 ring-2 ring-amber-500/50 hover:scale-105 transition-transform">
                <img
                  src="/assets/aistudio/naveda_logo.png"
                  alt="Naveda World Official Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="font-display text-xs font-black uppercase tracking-widest text-amber-400">
                  Official Landmark & Resort
                </span>
                <p className="text-xs text-neutral-300 font-semibold">
                  Umuahia, Abia State, Nigeria
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-4 py-1.5 text-xs font-black tracking-wider text-amber-300 backdrop-blur-md uppercase">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
                Umuahia Architectural Landmark
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md">
                <Clock className="h-3.5 w-3.5" />
                Open 24 Hours Daily
              </span>
              <button
                type="button"
                onClick={() => onInspectPhoto(heroPhoto)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-neutral-900/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white backdrop-blur-md hover:border-amber-400 transition-colors"
              >
                <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                View 4K Facade
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              NAVEDA WORLD <br />
              <span className="text-amber-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                BITES AND BREWS
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-photo-sub text-base sm:text-xl text-neutral-200 leading-relaxed max-w-2xl font-medium">
              Where luxury dining meets sports recreation and authentic Eastern highlife music. Explore 38 unique Pan-African culinary creations, an all-weather 5-a-side AstroTurf arena, Champions Billiards lounge, and round-the-clock hospitality.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('restaurant')}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-4 text-base font-bold text-neutral-950 shadow-xl shadow-amber-500/25 transition-all hover:from-amber-400 hover:to-orange-400 hover:scale-105 active:scale-95"
              >
                <UtensilsCrossed className="h-5 w-5" />
                Explore Menu (38 Dishes)
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-500/60 bg-emerald-950/60 px-6 py-4 text-base font-bold text-emerald-200 backdrop-blur-md transition-all hover:bg-emerald-600 hover:text-white hover:scale-105 active:scale-95"
              >
                Book Turf / VIP Table
              </button>
            </div>

            {/* Location Pill */}
            <div className="pt-2 text-xs font-semibold text-neutral-300 flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Okwuta Road by Ahiaeke Junction, Umuahia, Abia State</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS / HIGHLIGHTS BAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-center backdrop-blur-md">
            <span className="font-display text-3xl font-black text-amber-400 sm:text-4xl">38</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Spectacular Unique Dishes
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-center backdrop-blur-md">
            <span className="font-display text-3xl font-black text-emerald-400 sm:text-4xl">24/7</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Round-the-Clock Service
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-center backdrop-blur-md">
            <span className="font-display text-3xl font-black text-cyan-400 sm:text-4xl">5-A-Side</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              All-Weather AstroTurf Arena
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-center backdrop-blur-md">
            <span className="font-display text-3xl font-black text-purple-400 sm:text-4xl">Live</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Resident Highlife Band
            </p>
          </div>
        </div>
      </section>

      {/* SUBHEADING SECTION 1: Weekend Live Highlife Band (naveda11_ae89049b.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Cultural Entertainment
            </span>
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              Live Stage & Nightlife
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('nightlife')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Full Stage Lineup <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SubheadingBanner
          photo={NAVEDA_PHOTOS.liveBandStage}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve VIP Table for Live Band"
          ctaAction={onOpenBooking}
        />
      </section>

      {/* SUBHEADING SECTION 2: The Arena 5-A-Side AstroTurf (naveda223_72e0eba7.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Recreation & Championship
            </span>
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              The Arena AstroTurf Pitch
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sports')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Match Rates & Packages <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SubheadingBanner
          photo={NAVEDA_PHOTOS.cleanTurfPitch}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Book 5-A-Side Match Slot"
          ctaAction={onOpenBooking}
          reverse
        />
      </section>

      {/* SUBHEADING SECTION 3: Champions Billiards Lounge (naveda2222_ebc5846d.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Indoor Sports Club
            </span>
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              Champions Billiards & Snooker
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sports')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Explore Billiards <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SubheadingBanner
          photo={NAVEDA_PHOTOS.poolVines}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve Billiards Table & Drinks"
          ctaAction={onOpenBooking}
        />
      </section>

      {/* FEATURED MENU PREVIEW: 1 Dish to 1 Photo (No duplicates) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/40 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-neutral-800">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                World-Class Dining
              </span>
              <h2 className="font-display text-3xl font-black text-white sm:text-4xl pt-2">
                Spectacular Pan-African Bites
              </h2>
              <p className="text-sm text-neutral-300 pt-1">
                Every single dish has its own authentic high-definition photo. Zero duplicate photos.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveMenuTab('all')}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeMenuTab === 'all'
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                All Picks (38)
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('native')}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeMenuTab === 'native'
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Native Igbo Soups
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('mains')}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeMenuTab === 'mains'
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Jollof & Mains
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('seafood')}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeMenuTab === 'seafood'
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Ocean Seafood
              </button>
            </div>
          </div>

          {/* Dish Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-lg transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
              >
                {/* Dish Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {dish.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-lg bg-black/75 px-2.5 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md border border-amber-500/30">
                      {dish.badge}
                    </span>
                  )}
                  {dish.spicyLevel && (
                    <span className="absolute top-2.5 right-2.5 rounded-lg bg-red-950/80 px-2 py-0.5 text-[10px] font-bold text-red-300 border border-red-500/30">
                      🌶️ {dish.spicyLevel}
                    </span>
                  )}
                </div>

                {/* Dish Info */}
                <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {dish.categoryTitle}
                    </span>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                    <div>
                      <span className="font-display text-lg font-black text-amber-400">
                        {dish.price}
                      </span>
                      <p className="text-[10px] text-neutral-400">{dish.portion}</p>
                    </div>

                    <a
                      href={`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent(`Hello Naveda World, I would like to order: ${dish.name} (${dish.price})`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All 38 Dishes Link */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('restaurant')}
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-800 px-8 py-3.5 text-sm font-bold text-white hover:bg-amber-500 hover:text-neutral-950 border border-white/10 transition-all hover:scale-105"
            >
              <UtensilsCrossed className="h-4 w-4" />
              View Full Menu with All 38 Spectacular Dishes
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SUBHEADING SECTION 4: Terrace Pool Table & Garden View (naveda_22_aaf946fe.jpg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Alfresco Recreation
            </span>
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              Open-Air Terrace Games
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sports')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Terrace Details <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SubheadingBanner
          photo={NAVEDA_PHOTOS.poolTerrace}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve Terrace Table & Drinks"
          ctaAction={onOpenBooking}
          reverse
        />
      </section>

      {/* SUBHEADING SECTION 5: Naveda Mart & Grand Arrival (naveda_222222_cdcd9f7a.jpeg) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Mall & Supermarket
            </span>
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              Naveda Mart & Provisions
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('mart')}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            Explore Naveda Mart <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SubheadingBanner
          photo={NAVEDA_PHOTOS.entranceSignage}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Inquire on Cookware & Groceries"
          ctaAction={() => onNavigate('mart')}
        />
      </section>

      {/* WHY NAVEDA WORLD (Trust & Credentials) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 pb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              The Naveda Standard
            </span>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Why Guests Choose Naveda World
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              A comprehensive entertainment, dining, and sporting destination designed for discerning guests in Abia State and visiting travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-neutral-900/80 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">24/7 Uninterrupted Service</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Whether arriving for midnight pepper soup, dawn 5-a-side football, or high-energy weekend nightlife, our doors and kitchen never close.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-neutral-900/80 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Secured Executive Gated Facility</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Dedicated round-the-clock security personnel, paved valet parking bays, and CCTV monitoring ensure absolute peace of mind.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-neutral-900/80 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Igbo Cultural Authenticity</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                From slow-simmered Ofe Nsala white soup with fresh catfish to live highlife guitarists in traditional red caps, we honor Eastern heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
