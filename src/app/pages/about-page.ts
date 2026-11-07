import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Header Banner -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">domain</mat-icon>
            <span>The Landmark Destination · Umuahia, Abia State</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            The Naveda Complex: Vision & Architecture
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Strategically located at Okwuta Road by Ahiaeke Junction in Umuahia, Naveda World was founded to redefine leisure, dining, entertainment, and sporting culture in Abia State.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING 1 WITH BACKGROUND PHOTO: ARCHITECTURAL EXTERIOR (naveda_1111) -->
        <app-subheading-banner
          [imageSrc]="photos.buildingExterior.imageSrc"
          [title]="'World-Class Architecture & Modern Umuahia Landmark'"
          [subtitle]="'Engineered with modern architectural composite cladding, vibrant orange exterior accents, and executive glass facades that stand proudly along Okwuta Road.'"
          [badge]="'Architectural Masterpiece'"
          [badgeIcon]="'domain'"
          [location]="'Okwuta Road by Ahiaeke Junction, Umuahia'"
          [accent]="'orange'"
          [highlights]="['Iconic multi-story architecture', 'Signature orange frames & tinted glass', '24/7 guarded secure parking']"
          [actionLabel]="'View Complex Location'"
          [actionType]="'maps'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- Pillars of Naveda Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 shadow-xl">
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <mat-icon class="!w-6 !h-6">schedule</mat-icon>
            </div>
            <h3 class="text-xl font-bold font-display text-white">24/7 Uninterrupted Service</h3>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Hospitality that never sleeps. Whether arriving late from a journey or craving hot Nkwobi and cold brew at midnight, our kitchen, bar, and security are fully staffed 24 hours daily.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 shadow-xl">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <mat-icon class="!w-6 !h-6">shield</mat-icon>
            </div>
            <h3 class="text-xl font-bold font-display text-white">Security & Peaceful Ambiance</h3>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Discreet professional security, well-illuminated parking lots, and a welcoming family atmosphere where guests can unwind with absolute peace of mind.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 shadow-xl">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <mat-icon class="!w-6 !h-6">music_note</mat-icon>
            </div>
            <h3 class="text-xl font-bold font-display text-white">Celebrating Igbo Cultural Heritage</h3>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              From our live highlife weekend bands in traditional red caps to authentic wooden mortar nkwobi service, we honor authentic Eastern Nigerian pride.
            </p>
          </div>
        </div>

        <!-- SUBHEADING 2 WITH BACKGROUND PHOTO: GRAND ILLUMINATED ENTRANCE (naveda_222222) -->
        <app-subheading-banner
          [imageSrc]="photos.entranceSignage.imageSrc"
          [title]="'Grand Entrance & Corporate Hospitality'"
          [subtitle]="'Designed with glowing architectural signage, designer ceiling illumination, and attentive concierge staff welcoming guests into the dining and mall concourse.'"
          [badge]="'Arrival Concourse'"
          [badgeIcon]="'meeting_room'"
          [location]="'Main Concourse · Naveda Complex'"
          [accent]="'orange'"
          [highlights]="['Illuminated NAVEDA brand wall', 'Seamless access to all wings', '24/7 dedicated reception']"
          [actionLabel]="'Reserve Table at Reception'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- SUBHEADING 3 WITH BACKGROUND PHOTO: LIVE HIGHLIFE BAND STAGE (naveda11) -->
        <app-subheading-banner
          [imageSrc]="photos.liveBandStage.imageSrc"
          [title]="'Live Cultural Music & Weekend Highlife Heritage'"
          [subtitle]="'A living celebration of Eastern Nigerian sound. Seasoned live musicians take the stage every weekend to deliver authentic highlife, guitar riffs, and Afrobeats rhythms.'"
          [badge]="'Cultural Entertainment'"
          [badgeIcon]="'music_note'"
          [location]="'VIP Stage · Naveda Complex'"
          [accent]="'amber'"
          [highlights]="['Authentic red cap Igbo musicians', 'Weekend live band every Fri, Sat, Sun', 'Full cocktail and VIP bottle service']"
          [actionLabel]="'Book Weekend Live Band Table'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

      </div>
    </div>
  `
})
export class AboutPage {
  readonly photos = NAVEDA_PHOTOS;
  readonly site = NAVEDA_SITE;

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(event: { type: string; title: string }): void {
    this.openReservation.emit(event.title);
  }
}
