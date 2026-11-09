import React from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_SITE,
  SubheadingPhoto
} from '../data/navedaData';
import { useNavedaData } from '../context/DataContext';
import { SubheadingBanner } from '../components/SubheadingBanner';
import {
  Music,
  Wine,
  Sparkles,
  Calendar,
  Clock,
  MessageCircle,
  Crown
} from 'lucide-react';

interface NightlifePageProps {
  atmosphereClass: string;
  onInspectPhoto: (photo: SubheadingPhoto) => void;
  onOpenBooking: () => void;
}

export const NightlifePage: React.FC<NightlifePageProps> = ({
  atmosphereClass,
  onInspectPhoto,
  onOpenBooking
}) => {
  const { drinks } = useNavedaData();
  const schedule = [
    {
      day: 'Every Friday Night',
      title: 'Eastern Highlife Fiesta & Palm Wine Beats',
      time: '8:00 PM till Late',
      performer: 'Naveda Resident Highlife Masters (Red Cap Cultural Band)',
      description: 'Soulful electric guitar rhythms, live brass horn sections, traditional Igbo percussion, and classic highlife singalongs.'
    },
    {
      day: 'Every Saturday Night',
      title: 'Afrobeats Live Sessions & Guest Saxophonist',
      time: '8:30 PM till Dawn',
      performer: 'Live Fusion Band & Resident Club DJ',
      description: 'Contemporary Afrobeats hits fused with live saxophone improvisation, bottle sparklers, and VIP club energy.'
    },
    {
      day: 'Every Sunday Evening',
      title: 'Sunday Sundown Acoustic & Old School Highlife',
      time: '6:00 PM – 11:00 PM',
      performer: 'Acoustic Trio & Vocalists',
      description: 'Relaxed evening chill paired with fresh catfish pepper soup, chilled brews, and timeless classics.'
    }
  ];

  const handleBottleOrder = (bottleName: string, price: string) => {
    const text = encodeURIComponent(
      `Hello Naveda VIP Lounge, I would like to reserve a VIP table and order *${bottleName}* (${price}) for this weekend.`
    );
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Subheading Banner: Weekend Live Highlife Band (naveda11_ae89049b.jpg) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.liveBandStage}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Reserve VIP Live Band Table"
          ctaAction={onOpenBooking}
        />
      </div>

      {/* Live Stage Schedule */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 pb-10">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
            Live Music & Stage
          </span>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            Weekly Live Performance Lineup
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Experience our authentic Igbo highlife band performing live in traditional red caps and cultural regalia every weekend on the main stage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                    {item.day}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    {item.time}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <Music className="h-3.5 w-3.5" />
                    {item.performer}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed pt-2 border-t border-neutral-800">
                  {item.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-800 py-3 text-xs font-bold text-neutral-200 hover:bg-amber-500 hover:text-neutral-950 transition-all border border-white/10"
                >
                  <Calendar className="h-4 w-4" />
                  Reserve Table for {item.day}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Bottle Service Menu */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Executive Service
                </span>
              </div>
              <h2 className="font-display text-3xl font-black text-white sm:text-4xl pt-1">
                VIP Bottle & Champagne Selection
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 pt-1">
                Served with crystal flutes, ice buckets, sparklers, and dedicated VIP lounge hostess service.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              <Sparkles className="h-4 w-4" />
              Book VIP Booth / Lounge
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8">
            {drinks.map((bottle, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-amber-500/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">
                      {bottle.category}
                    </span>
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                      {bottle.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {bottle.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {bottle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="font-display text-lg font-black text-amber-400">
                    {bottle.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBottleOrder(bottle.name, bottle.price)}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
