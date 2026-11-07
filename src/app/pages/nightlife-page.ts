import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_PHOTOS, NAVEDA_VIP_BOTTLES, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-nightlife-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Header Banner -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">nightlife</mat-icon>
            <span>Naveda VIP Lounge · Highlife Live Band Every Weekend</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            VIP Lounge, Live Band & Exotic Cellar
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            The beating heart of Umuahia nightlife. Experience electrifying weekend performances by master Nigerian highlife musicians in traditional red Igbo caps and cultural attire, plush VIP booths, Hennessy XO bottle service, and billiards gaming into the dawn.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING 1 WITH BACKGROUND PHOTO: AUTHENTIC LIVE HIGHLIFE BAND ON STAGE -->
        <app-subheading-banner
          [imageSrc]="photos.liveBandStage.imageSrc"
          [title]="photos.liveBandStage.title"
          [subtitle]="photos.liveBandStage.subtitle"
          [badge]="photos.liveBandStage.badge"
          [badgeIcon]="photos.liveBandStage.badgeIcon"
          [location]="photos.liveBandStage.location"
          [accent]="photos.liveBandStage.accent"
          [highlights]="photos.liveBandStage.highlights"
          [actionLabel]="'Reserve Live Band Stage Table'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- Live Highlife Band Schedule -->
        <div class="space-y-6">
          <div class="text-center md:text-left">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Every Weekend Live</span>
            <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-1">
              Weekend Live Highlife Band Schedule
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-4 shadow-xl">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Friday Night
                </span>
                <span class="text-xs text-neutral-400">8:00 PM – Late</span>
              </div>
              <h3 class="text-xl font-bold text-white font-display">Afrobeats & Highlife Ignition</h3>
              <p class="text-xs text-neutral-300 leading-relaxed">
                Kick off the weekend with high-tempo highlife fusion, live brass horns, and our resident groove masters setting the stage alight.
              </p>
              <div class="text-xs font-semibold text-amber-400">Featuring: Eastern Groove Kings</div>
            </div>

            <div class="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/40 space-y-4 shadow-xl relative overflow-hidden">
              <div class="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-amber-500 to-yellow-600 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-bl-xl">
                Peak Vibe
              </div>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Saturday Gala
                </span>
                <span class="text-xs text-neutral-400">7:30 PM – Sunrise</span>
              </div>
              <h3 class="text-xl font-bold text-white font-display">The Grand Highlife Experience</h3>
              <p class="text-xs text-neutral-300 leading-relaxed">
                Classic Igbo highlife guitarists, talking drums, traditional percussion, sizzling Nkwobi platters, and premium champagne toasts.
              </p>
              <div class="text-xs font-semibold text-amber-400">Featuring: Royal Highlife Ensemble</div>
            </div>

            <div class="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-4 shadow-xl">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Sunday Chill
                </span>
                <span class="text-xs text-neutral-400">5:00 PM – Midnight</span>
              </div>
              <h3 class="text-xl font-bold text-white font-display">Sunday Family Soul & Palm Wine</h3>
              <p class="text-xs text-neutral-300 leading-relaxed">
                Mellow acoustic rhythms, authentic Eastern melodies, rich Ofe Nsala white soup, and fresh sweet palm wine carafes.
              </p>
              <div class="text-xs font-semibold text-amber-400">Featuring: Acoustic Heritage Strings</div>
            </div>
          </div>
        </div>

        <!-- SUBHEADING 2 WITH BACKGROUND PHOTO: VIP INDOOR BILLIARDS LOUNGE -->
        <app-subheading-banner
          [imageSrc]="photos.poolVines.imageSrc"
          [title]="'VIP Games, Cocktails & Indoor Hangout'"
          [subtitle]="'Unwind in our luxury billiards lounge framed with lush cascading green vines, warm industrial designer lights, and plush bar seating.'"
          [badge]="'VIP Billiards Club'"
          [badgeIcon]="'sports_bar'"
          [location]="'Upper Lounge · Naveda Complex'"
          [accent]="'emerald'"
          [highlights]="['Pro 8-ball & 9-ball tables', 'Chilled craft cocktails & cold brews', 'Exclusive VIP table service']"
          [actionLabel]="'Reserve VIP Games Booth'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- VIP Bottle Collection Showcase -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Exotic Cellar</span>
              <h2 class="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                Prestige Bottle Service
              </h2>
            </div>
            <span class="text-xs text-neutral-400 hidden sm:inline">Served with ice sparklers & VIP hosts</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (bottle of vipBottles; track bottle.name) {
              <div class="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl space-y-3">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">{{ bottle.category }}</span>
                  <h4 class="text-base font-black text-white font-display mt-1">{{ bottle.name }}</h4>
                  <div class="text-xl font-black text-amber-400 my-2">{{ bottle.price }}</div>
                  <p class="text-xs text-neutral-400 leading-relaxed">{{ bottle.description }}</p>
                </div>
                <button
                  type="button"
                  (click)="reserveBottle(bottle.name)"
                  class="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-amber-500/20"
                >
                  Reserve Bottle
                </button>
              </div>
            }
          </div>
        </div>

        <!-- SUBHEADING 3 WITH BACKGROUND PHOTO: TERRACE BREEZE & TWILIGHT SOCIAL LOUNGE -->
        <app-subheading-banner
          [imageSrc]="photos.poolTerrace.imageSrc"
          [title]="'Terrace Breeze & Twilight Social Lounge'"
          [subtitle]="'Step out onto the open-air balcony under warm festoon lights and tropical breezes, perfect for cool evening drinks and midnight conversations.'"
          [badge]="'Alfresco Twilight Terrace'"
          [badgeIcon]="'deck'"
          [location]="'Garden Terrace · Naveda Complex'"
          [accent]="'cyan'"
          [highlights]="['Open terrace vistas', 'Acoustic comfort ceiling', 'Private booth bookings available']"
          [actionLabel]="'Book Twilight Terrace Table'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

      </div>
    </div>
  `
})
export class NightlifePage {
  readonly photos = NAVEDA_PHOTOS;
  readonly vipBottles = NAVEDA_VIP_BOTTLES;
  readonly site = NAVEDA_SITE;

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(event: { type: string; title: string }): void {
    this.openReservation.emit(event.title);
  }

  reserveBottle(bottleName: string): void {
    this.openReservation.emit(`VIP Bottle Service: ${bottleName}`);
  }
}
