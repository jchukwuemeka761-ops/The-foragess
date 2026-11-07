import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';
import { Atmosphere } from '../services/atmosphere';

@Component({
  selector: 'app-lightbox-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/90 backdrop-blur-xl animate-fade-in"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        (keydown.escape)="closeModal()"
      >
        <!-- Backdrop Click Area -->
        <button
          type="button"
          class="absolute inset-0 w-full h-full bg-transparent border-0 cursor-default"
          (click)="closeModal()"
          aria-label="Close modal backdrop"
        ></button>

        <div
          class="relative w-full max-w-5xl bg-neutral-900 border border-amber-500/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] z-10"
        >
          <!-- Top Header Bar -->
          <div
            class="px-5 py-3.5 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0"
              >
                4K Ultra Venue View
              </span>
              <h3 class="text-sm sm:text-base font-bold text-white truncate font-display">
                {{ photoDetails()?.title || 'Naveda World Venue Space' }}
              </h3>
            </div>

            <button
              type="button"
              (click)="closeModal()"
              class="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <mat-icon class="!w-5 !h-5 !text-lg leading-none">close</mat-icon>
            </button>
          </div>

          <!-- Main Image Display (Maximum Visibility) -->
          <div class="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[440px]">
            <img
              [src]="imageSrc()"
              [alt]="photoDetails()?.title || 'Naveda World Venue Space'"
              class="max-w-full max-h-[65vh] object-contain transition-all duration-300"
              [class]="atmosphere.getCurrentCssClass()"
              referrerpolicy="no-referrer"
            />
          </div>

          <!-- Bottom Footer Details & Action -->
          <div
            class="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="space-y-1 text-center sm:text-left">
              <div class="flex items-center justify-center sm:justify-start gap-2 text-xs text-amber-400 font-semibold">
                <mat-icon class="!w-4 !h-4 !text-base">place</mat-icon>
                <span>{{ photoDetails()?.location || 'Okwuta Road by Ahiaeke Junction, Umuahia' }}</span>
              </div>
              <p class="text-xs sm:text-sm text-neutral-300 max-w-xl">
                {{ photoDetails()?.subtitle || 'Experience unmatched hospitality, dining, and sports at Naveda World.' }}
              </p>
            </div>

            <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <a
                [href]="whatsappBookingUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-xs font-black uppercase tracking-wider transition-all shadow-md"
              >
                <mat-icon class="!w-4 !h-4 !text-base leading-none">chat</mat-icon>
                <span>Book This Space on WhatsApp</span>
              </a>
              <button
                type="button"
                (click)="closeModal()"
                class="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class LightboxModal {
  readonly atmosphere = inject(Atmosphere);

  readonly isOpen = input<boolean>(false);
  readonly imageSrc = input<string>('');
  readonly modalClose = output<void>();

  readonly photoDetails = computed(() => {
    const src = this.imageSrc();
    if (!src) return null;
    const all = Object.values(NAVEDA_PHOTOS);
    return all.find(p => p.imageSrc === src) || null;
  });

  readonly whatsappBookingUrl = computed(() => {
    const title = this.photoDetails()?.title || 'Naveda World Venue Space';
    const text = encodeURIComponent(`Hello Naveda World, I saw the photo of "${title}" on your website and would like to inquire about booking/availability.`);
    return `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`;
  });

  closeModal(): void {
    this.modalClose.emit();
  }
}
