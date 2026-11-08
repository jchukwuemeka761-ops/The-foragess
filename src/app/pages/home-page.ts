import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';
import { Atmosphere } from '../services/atmosphere';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-16 pb-16">
      
      <!-- HERO SECTION: NAVEDA ARCHITECTURAL EXTERIOR (naveda_1111) AS HIGH-VISIBILITY BACKGROUND -->
      <section
        class="relative min-h-[580px] sm:min-h-[660px] md:min-h-[720px] flex items-center justify-center overflow-hidden border-b border-amber-500/30"
      >
        <!-- Background Photo: naveda_1111 (Ultra Visible, High Exposure & Contrast) -->
        <img
          [src]="photos.buildingExterior.imageSrc"
          alt="Naveda World Complex Modern Architecture in Umuahia"
          class="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-all duration-700 ease-out"
          [class]="atmosphere.getCurrentCssClass()"
          referrerpolicy="no-referrer"
        />

        <!-- Luminance-Preserving Overlays: Leaves building structure, orange trim, and glass vivid and clear -->
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-black/20 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-transparent to-neutral-950/65 pointer-events-none"></div>

        <!-- Ambient orange/amber accent glow -->
        <div class="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-orange-600/25 blur-3xl rounded-full pointer-events-none"></div>

        <!-- 4K Inspection Button on Hero (Top Right) -->
        <div class="absolute top-6 right-6 z-20">
          <button
            type="button"
            (click)="onPhotoLightbox(photos.buildingExterior.imageSrc)"
            class="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md border border-orange-500/50 hover:border-orange-400 text-orange-300 hover:text-white text-xs font-bold tracking-wide transition-all shadow-xl cursor-pointer"
            title="Inspect full high-res architecture photo"
          >
            <mat-icon class="!w-4 !h-4 !text-base leading-none">fullscreen</mat-icon>
            <span class="hidden sm:inline">View Full 4K Exterior Photo</span>
          </button>
        </div>

        <!-- Hero Content Overlay -->
        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-orange-500/50 text-orange-300 text-xs font-bold uppercase tracking-widest shadow-2xl">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Open 24 Hours Daily · Okwuta Road by Ahiaeke Junction, Umuahia</span>
          </div>

          <h1 class="text-4xl sm:text-6xl md:text-7xl font-black text-white font-display tracking-tight leading-tight text-photo-heading">
            Fine Dining, Crafted Cocktails, Weekend Live Band & Sports
          </h1>

          <p class="text-base sm:text-xl text-neutral-100 text-photo-sub max-w-3xl mx-auto leading-relaxed font-normal">
            Welcome to Naveda World Bites And Brews. Eastern Nigeria's landmark lifestyle destination: authentic native delicacies, all-weather 5-a-side AstroTurf, VIP billiards club, and live weekend highlife musicals.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              (click)="onReservationClick('General Complex Table / Booth')"
              class="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-2xl shadow-orange-950/70 cursor-pointer transform hover:-translate-y-0.5"
            >
              Reserve Table or VIP Booth
            </button>

            <button
              type="button"
              (click)="navigatePage('sports')"
              class="px-6 py-4 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider transition-colors border border-emerald-500/50 hover:border-emerald-400 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <mat-icon class="!w-4 !h-4 !text-base text-emerald-400">sports_soccer</mat-icon>
              <span>The Arena Sports</span>
            </button>

            <button
              type="button"
              (click)="navigatePage('restaurant')"
              class="px-6 py-4 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 backdrop-blur-md text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border border-amber-500/40 hover:border-amber-300 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <mat-icon class="!w-4 !h-4 !text-base text-amber-400">restaurant_menu</mat-icon>
              <span>View 82 Menu</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Main Content Container with Photo Subheadings (ZERO DUPLICATES) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        <!-- SUBHEADING 1: THE ARENA 5-A-SIDE ASTROTURF PITCH (CLEAN PITCH PHOTO) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Outdoor Sports Arena</span>
              <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">
                The Arena: 5-A-Side AstroTurf Pitch
              </h2>
            </div>
            <button
              type="button"
              (click)="navigatePage('sports')"
              class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Sports Hub</span>
              <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
            </button>
          </div>

          <app-subheading-banner
            [imageSrc]="photos.cleanTurfPitch.imageSrc"
            [title]="photos.cleanTurfPitch.title"
            [subtitle]="photos.cleanTurfPitch.subtitle"
            [badge]="photos.cleanTurfPitch.badge"
            [badgeIcon]="photos.cleanTurfPitch.badgeIcon"
            [location]="photos.cleanTurfPitch.location"
            [accent]="photos.cleanTurfPitch.accent"
            [highlights]="photos.cleanTurfPitch.highlights"
            [actionLabel]="'Book 5-A-Side Slot'"
            [actionType]="'pitch'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- SUBHEADING 2: THE CHAMPIONS BILLIARDS & SNOOKER LOUNGE (VINES PHOTO) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">VIP Billiards Club</span>
              <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">
                The Champions Billiards Lounge
              </h2>
            </div>
            <button
              type="button"
              (click)="navigatePage('sports')"
              class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Table Rules</span>
              <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
            </button>
          </div>

          <app-subheading-banner
            [imageSrc]="photos.poolVines.imageSrc"
            [title]="photos.poolVines.title"
            [subtitle]="photos.poolVines.subtitle"
            [badge]="photos.poolVines.badge"
            [badgeIcon]="photos.poolVines.badgeIcon"
            [location]="photos.poolVines.location"
            [accent]="photos.poolVines.accent"
            [highlights]="photos.poolVines.highlights"
            [actionLabel]="'Reserve Pool Table'"
            [actionType]="'pool'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- SUBHEADING 3: AUTHENTIC LIVE HIGHLIFE BAND (REAL STAGE PHOTO: naveda11) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Weekend Entertainment</span>
              <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">
                Weekend Live Highlife Band & Stage
              </h2>
            </div>
            <button
              type="button"
              (click)="navigatePage('nightlife')"
              class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>See Band Schedule</span>
              <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
            </button>
          </div>

          <app-subheading-banner
            [imageSrc]="photos.liveBandStage.imageSrc"
            [title]="photos.liveBandStage.title"
            [subtitle]="photos.liveBandStage.subtitle"
            [badge]="photos.liveBandStage.badge"
            [badgeIcon]="photos.liveBandStage.badgeIcon"
            [location]="photos.liveBandStage.location"
            [accent]="photos.liveBandStage.accent"
            [highlights]="photos.liveBandStage.highlights"
            [actionLabel]="'Reserve VIP Stage Booth'"
            [actionType]="'reservation'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- SUBHEADING 4: GRAND ENTRANCE & NAVEDA MART (SIGNAGE PHOTO: naveda_222222) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-orange-400">Shopping & Complex Mall</span>
              <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">
                Grand Entrance & Naveda Mart
              </h2>
            </div>
            <button
              type="button"
              (click)="navigatePage('mart')"
              class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Shop Mart Catalog</span>
              <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
            </button>
          </div>

          <app-subheading-banner
            [imageSrc]="photos.entranceSignage.imageSrc"
            [title]="photos.entranceSignage.title"
            [subtitle]="photos.entranceSignage.subtitle"
            [badge]="photos.entranceSignage.badge"
            [badgeIcon]="photos.entranceSignage.badgeIcon"
            [location]="photos.entranceSignage.location"
            [accent]="photos.entranceSignage.accent"
            [highlights]="photos.entranceSignage.highlights"
            [actionLabel]="'Visit Naveda Mart'"
            [actionType]="'whatsapp'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- SUBHEADING 5: OPEN-AIR TERRACE POOL & GARDEN VISTAS (TERRACE PHOTO: naveda_22) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Garden Leisure & Alfresco Chill</span>
              <h2 class="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">
                Terrace Pool Table & Garden Breezes
              </h2>
            </div>
            <button
              type="button"
              (click)="navigatePage('sports')"
              class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Terrace Games</span>
              <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
            </button>
          </div>

          <app-subheading-banner
            [imageSrc]="photos.poolTerrace.imageSrc"
            [title]="photos.poolTerrace.title"
            [subtitle]="photos.poolTerrace.subtitle"
            [badge]="photos.poolTerrace.badge"
            [badgeIcon]="photos.poolTerrace.badgeIcon"
            [location]="photos.poolTerrace.location"
            [accent]="photos.poolTerrace.accent"
            [highlights]="photos.poolTerrace.highlights"
            [actionLabel]="'Book Terrace Table & Drinks'"
            [actionType]="'pool'"
            (openLightbox)="onPhotoLightbox($event)"
            (openAction)="onAction($event)"
          />
        </div>

        <!-- Venue Overview Grid Cards -->
        <div class="space-y-6">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Everything Under One Roof</span>
            <h2 class="text-3xl sm:text-4xl font-black text-white font-display">
              The Naveda Multi-Venue Experience
            </h2>
            <p class="text-sm text-neutral-400">
              Discover all dedicated wings and services available 24 hours daily at our Umuahia complex.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              type="button"
              (click)="navigatePage('restaurant')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <mat-icon>restaurant</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                Restaurant & 82 Dishes
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                Eastern Nigerian specialties like spicy Nkwobi in wooden mortars, rich Ofe Nsala white soup, and fresh charcoal grilled catfish.
              </p>
              <span class="text-xs font-bold text-amber-400 flex items-center gap-1 pt-1">
                <span>View Menu</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>

            <button
              type="button"
              (click)="navigatePage('nightlife')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <mat-icon>nightlife</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                VIP Lounge & Live Band
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                Live Highlife performances every Friday, Saturday, and Sunday evening. Moët champagne, Hennessy XO, and VIP booth service.
              </p>
              <span class="text-xs font-bold text-amber-400 flex items-center gap-1 pt-1">
                <span>See Schedule</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>

            <button
              type="button"
              (click)="navigatePage('sports')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <mat-icon>sports_soccer</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-emerald-400 transition-colors">
                The Arena Sports & Billiards
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                All-weather synthetic turf 5-a-side pitch with floodlights, precision tournament pool tables, and multi-screen football viewing.
              </p>
              <span class="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                <span>Book Pitch or Pool</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>

            <button
              type="button"
              (click)="navigatePage('mart')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <mat-icon>storefront</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                Naveda Mart & Mall
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                Stainless cookware sets, traditional hand-carved Iroko mortars, granite pans, imported provisions, and sports goods.
              </p>
              <span class="text-xs font-bold text-amber-400 flex items-center gap-1 pt-1">
                <span>Shop Catalog</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>

            <button
              type="button"
              (click)="navigatePage('about')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <mat-icon>domain</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                The Complex & Architecture
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                Located at Ahiaeke Junction in Umuahia. Built to international standards with 24/7 security and Nigerian cultural pride.
              </p>
              <span class="text-xs font-bold text-cyan-400 flex items-center gap-1 pt-1">
                <span>Read Story</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>

            <button
              type="button"
              (click)="navigatePage('contact')"
              class="w-full text-left group p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 cursor-pointer space-y-3 shadow-lg"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <mat-icon>place</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                Location & 24/7 Service
              </h3>
              <p class="text-xs text-neutral-400 leading-relaxed">
                Okwuta Road by Ahiaeke Junction. Direct Google Maps navigation, phone calling, and 24-hour continuous service.
              </p>
              <span class="text-xs font-bold text-amber-400 flex items-center gap-1 pt-1">
                <span>Get Directions</span>
                <mat-icon class="!w-4 !h-4 !text-base">arrow_forward</mat-icon>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class HomePage {
  readonly atmosphere = inject(Atmosphere);
  readonly photos = NAVEDA_PHOTOS;
  readonly site = NAVEDA_SITE;

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();
  readonly navigate = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(event: { type: string; title: string }): void {
    this.openReservation.emit(event.title);
  }

  onReservationClick(category: string): void {
    this.openReservation.emit(category);
  }

  navigatePage(pageId: string): void {
    this.navigate.emit(pageId);
  }
}
