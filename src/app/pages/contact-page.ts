import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Header Banner -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">place</mat-icon>
            <span>Location & 24/7 Front Desk · Umuahia</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Contact Naveda & Visit Us
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Conveniently situated along Okwuta Road by Ahiaeke Junction in Umuahia. We are open 24 hours every day of the week, with ample secure parking and warm hospitality.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING WITH BACKGROUND PHOTO: VISIT THE COMPLEX (naveda_1111) -->
        <app-subheading-banner
          [imageSrc]="photos.buildingExterior.imageSrc"
          [title]="'Visit The Complex — Okwuta Road by Ahiaeke Junction'"
          [subtitle]="'Find us easily at Ahiaeke Junction. Whether arriving for daytime football kickoffs, evening cocktails, or midnight dining, our front gates are always open.'"
          [badge]="'24/7 Landmark Location'"
          [badgeIcon]="'navigation'"
          [location]="site.landmark"
          [accent]="'orange'"
          [highlights]="['Direct access on Okwuta Road', '24/7 secured parking', 'Plus Code: GG9H+4R8']"
          [actionLabel]="'Open in Google Maps'"
          [actionType]="'maps'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="openGoogleMaps()"
        />

        <!-- Contact Cards & Map -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Contact Details (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
              <h3 class="text-xl font-bold font-display text-white">Direct Contacts</h3>

              <div class="space-y-4">
                <a
                  [href]="'tel:' + site.phoneRaw"
                  class="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 transition-colors"
                >
                  <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <mat-icon>phone</mat-icon>
                  </div>
                  <div>
                    <div class="text-xs text-neutral-400 font-semibold uppercase">Phone Direct</div>
                    <div class="text-sm font-bold text-white">{{ site.phoneDisplay }}</div>
                    <div class="text-[11px] text-amber-400">Available 24 hours daily</div>
                  </div>
                </a>

                <a
                  [href]="site.whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 transition-colors"
                >
                  <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <mat-icon>chat</mat-icon>
                  </div>
                  <div>
                    <div class="text-xs text-neutral-400 font-semibold uppercase">WhatsApp Front Desk</div>
                    <div class="text-sm font-bold text-white">{{ site.phoneDisplay }}</div>
                    <div class="text-[11px] text-emerald-400">Instant Chat & Table Bookings</div>
                  </div>
                </a>

                <div class="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <mat-icon>schedule</mat-icon>
                  </div>
                  <div>
                    <div class="text-xs text-neutral-400 font-semibold uppercase">Hours of Operation</div>
                    <div class="text-sm font-bold text-white">{{ site.hours }}</div>
                    <div class="text-[11px] text-neutral-400">Mon - Sun (Uninterrupted 24/7)</div>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <mat-icon>pin_drop</mat-icon>
                  </div>
                  <div>
                    <div class="text-xs text-neutral-400 font-semibold uppercase">Address & Plus Code</div>
                    <div class="text-xs font-bold text-white leading-relaxed">{{ site.address }}</div>
                    <div class="text-[11px] text-amber-400">Plus Code: {{ site.plusCode }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div class="flex flex-col gap-3">
              <button
                type="button"
                (click)="onAction({ type: 'reservation', title: 'Table or Slot Reservation' })"
                class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/50 cursor-pointer flex items-center justify-center gap-2"
              >
                <mat-icon class="!w-4 !h-4 !text-base">calendar_today</mat-icon>
                <span>Make a Reservation Online</span>
              </button>

              <a
                [href]="site.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <mat-icon class="!w-4 !h-4 !text-base text-amber-400">directions</mat-icon>
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          <!-- Interactive Google Maps Embed (7 cols) -->
          <div class="lg:col-span-7 space-y-4">
            <div class="rounded-2xl overflow-hidden border border-amber-500/30 bg-neutral-900 shadow-2xl relative min-h-[420px]">
              <div class="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span class="text-xs font-bold text-white">Google Maps Interactive Location</span>
                </div>
                <a
                  [href]="site.googleMapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Full Map</span>
                  <mat-icon class="!w-3 !h-3 !text-xs">open_in_new</mat-icon>
                </a>
              </div>

              <iframe
                title="Naveda World Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.077271810502!2d7.526987575775467!3d5.517812494462615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042db97b51d5c8f%3A0x4396ef5b2660ab1f!2sNaveda%20World%20Bites%20And%20Brews!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%"
                height="380"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-[380px]"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </div>
  `
})
export class ContactPage {
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

  openGoogleMaps(): void {
    window.open(this.site.googleMapsUrl, '_blank', 'noopener,noreferrer');
  }
}
