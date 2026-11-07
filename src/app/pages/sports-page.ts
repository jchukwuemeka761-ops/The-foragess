import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_PHOTOS, NAVEDA_PITCH_PACKAGES, NAVEDA_BILLIARDS_DETAILS, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-sports-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Page Hero Header -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">sports_soccer</mat-icon>
            <span>The Arena & Recreation Hub · Umuahia</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            The Arena: 5-A-Side AstroTurf & Billiards Lounge
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Welcome to Eastern Nigeria's premier sports and recreation destination. Featuring our all-weather striped synthetic 5-a-side AstroTurf pitch, high-stakes tournament billiards lounges, panoramic spectator viewing, and ice-cold draught towers.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING 1 WITH BACKGROUND PHOTO: THE ARENA CLEAN ASTROTURF PITCH -->
        <div>
          <app-subheading-banner
            [imageSrc]="photos.cleanTurfPitch.imageSrc"
            [title]="photos.cleanTurfPitch.title"
            [subtitle]="photos.cleanTurfPitch.subtitle"
            [badge]="photos.cleanTurfPitch.badge"
            [badgeIcon]="photos.cleanTurfPitch.badgeIcon"
            [location]="photos.cleanTurfPitch.location"
            [accent]="photos.cleanTurfPitch.accent"
            [highlights]="photos.cleanTurfPitch.highlights"
            [actionLabel]="'Book 5-A-Side Pitch Slot'"
            [actionType]="'pitch'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />

          <!-- Supporting Pitch Details Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-4">
            @for (pkg of pitchPackages; track pkg.id) {
              <div
                class="rounded-2xl p-6 bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {{ pkg.badge }}
                    </span>
                    <span class="text-xs text-neutral-400">{{ pkg.time }}</span>
                  </div>
                  <h3 class="text-lg font-black text-white font-display">{{ pkg.title }}</h3>
                  <div class="text-2xl font-black text-amber-400 my-2">{{ pkg.rate }}</div>
                  <ul class="space-y-2 mt-4 text-xs text-neutral-300">
                    @for (perk of pkg.perks; track perk) {
                      <li class="flex items-center gap-2">
                        <mat-icon class="!w-4 !h-4 !text-base text-emerald-400 shrink-0">check</mat-icon>
                        <span>{{ perk }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <button
                  type="button"
                  (click)="bookPitchSlot(pkg.title)"
                  class="mt-6 w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-emerald-600 hover:text-white text-emerald-300 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border border-emerald-500/30"
                >
                  Reserve {{ pkg.title }}
                </button>
              </div>
            }
          </div>
        </div>

        <!-- SUBHEADING 2 WITH BACKGROUND PHOTO: THE CHAMPIONS BILLIARDS LOUNGE -->
        <div>
          <app-subheading-banner
            [imageSrc]="photos.poolVines.imageSrc"
            [title]="photos.poolVines.title"
            [subtitle]="photos.poolVines.subtitle"
            [badge]="photos.poolVines.badge"
            [badgeIcon]="photos.poolVines.badgeIcon"
            [location]="photos.poolVines.location"
            [accent]="photos.poolVines.accent"
            [highlights]="photos.poolVines.highlights"
            [actionLabel]="'Reserve Pool Table Slot'"
            [actionType]="'pool'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />

          <!-- Billiards Feature Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-4">
            @for (detail of billiardsDetails; track detail.title) {
              <div class="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                <mat-icon class="!w-8 !h-8 !text-2xl text-emerald-400">{{ detail.icon }}</mat-icon>
                <h4 class="text-base font-bold text-white font-display">{{ detail.title }}</h4>
                <p class="text-xs text-neutral-400 leading-relaxed">{{ detail.description }}</p>
              </div>
            }
          </div>
        </div>

        <!-- SUBHEADING 3 WITH BACKGROUND PHOTO: TERRACE POOL & OPEN AIR RECREATION -->
        <div>
          <app-subheading-banner
            [imageSrc]="photos.poolTerrace.imageSrc"
            [title]="photos.poolTerrace.title"
            [subtitle]="photos.poolTerrace.subtitle"
            [badge]="photos.poolTerrace.badge"
            [badgeIcon]="photos.poolTerrace.badgeIcon"
            [location]="photos.poolTerrace.location"
            [accent]="photos.poolTerrace.accent"
            [highlights]="photos.poolTerrace.highlights"
            [actionLabel]="'Book Terrace Game & Cocktails'"
            [actionType]="'pool'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- Quick Contact Card -->
        <div class="rounded-3xl p-8 bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-left">
            <h3 class="text-2xl font-black text-white font-display">Organizing a League or Private Match?</h3>
            <p class="text-sm text-neutral-300 max-w-xl">
              Call our sports coordinator directly or chat on WhatsApp to schedule match fixtures, corporate tournaments, or weekly training sessions.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <a
              [href]="site.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <mat-icon class="!w-4 !h-4 !text-base">chat</mat-icon>
              <span>WhatsApp Sports Desk</span>
            </a>
            <a
              [href]="'tel:' + site.phoneRaw"
              class="px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 flex items-center gap-2"
            >
              <mat-icon class="!w-4 !h-4 !text-base text-amber-400">call</mat-icon>
              <span>{{ site.phoneDisplay }}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SportsPage {
  readonly photos = NAVEDA_PHOTOS;
  readonly pitchPackages = NAVEDA_PITCH_PACKAGES;
  readonly billiardsDetails = NAVEDA_BILLIARDS_DETAILS;
  readonly site = NAVEDA_SITE;

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(event: { type: string; title: string }): void {
    this.openReservation.emit(event.title);
  }

  bookPitchSlot(name: string): void {
    this.openReservation.emit(`The Arena Pitch: ${name}`);
  }
}
