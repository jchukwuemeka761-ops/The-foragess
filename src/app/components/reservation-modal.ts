import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-reservation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/90 backdrop-blur-xl animate-fade-in overflow-y-auto"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        (keydown.escape)="closeModal()"
      >
        <!-- Backdrop Button -->
        <button
          type="button"
          class="absolute inset-0 w-full h-full bg-transparent border-0 cursor-default"
          (click)="closeModal()"
          aria-label="Close modal backdrop"
        ></button>

        <div
          class="relative w-full max-w-xl bg-neutral-900 border border-amber-500/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl my-8 z-10"
        >
          <!-- Top Header -->
          <div
            class="px-6 py-4 bg-neutral-950/90 border-b border-neutral-800 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <mat-icon>calendar_today</mat-icon>
              </div>
              <div>
                <h3 class="text-lg font-black text-white font-display">Make a Reservation</h3>
                <p class="text-xs text-neutral-400">Table, AstroTurf Pitch or Billiards Slot</p>
              </div>
            </div>

            <button
              type="button"
              (click)="closeModal()"
              class="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <mat-icon class="!w-5 !h-5 !text-lg leading-none">close</mat-icon>
            </button>
          </div>

          <!-- Form Content -->
          <form [formGroup]="form" (ngSubmit)="submitBooking()" class="p-6 space-y-4">
            <!-- Venue / Booking Category -->
            <div>
              <label for="booking-category" class="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                Select Venue Area / Activity
              </label>
              <select
                id="booking-category"
                formControlName="category"
                class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
              >
                <option value="5-a-Side AstroTurf Pitch Slot">⚽ The Arena: 5-A-Side AstroTurf Pitch Slot</option>
                <option value="Champions Billiards & Snooker Table">🎱 Champions Billiards & Pool Lounge</option>
                <option value="Fine Dining & Native Dishes Table">🍲 Restaurant Dining & Native Dishes (Nkwobi/Soups)</option>
                <option value="VIP Nightlife Lounge & Highlife Table">🎷 VIP Lounge & Weekend Live Band Stage</option>
                <option value="Outdoor Terrace & Garden Patio">🌿 Open-Air Terrace & Garden Drinks</option>
                <option value="Private Event / Birthday Celebration">🎉 Private Event / Birthday Gathering</option>
              </select>
            </div>

            <!-- Name & Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="booking-name" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  formControlName="name"
                  placeholder="e.g. Chief Emeka Okoro"
                  class="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label for="booking-phone" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  formControlName="phone"
                  placeholder="e.g. 08012345678"
                  class="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <!-- Date, Time & Number of Guests -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="booking-date" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  formControlName="date"
                  class="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label for="booking-time" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Time / Slot
                </label>
                <input
                  id="booking-time"
                  type="text"
                  formControlName="time"
                  placeholder="e.g. 7:00 PM"
                  class="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label for="booking-guests" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Guests / Players
                </label>
                <select
                  id="booking-guests"
                  formControlName="guests"
                  class="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                >
                  <option value="1-2 Guests">1-2 Guests</option>
                  <option value="3-5 Guests">3-5 Guests</option>
                  <option value="6-10 Guests (Team)">6-10 Guests (Team)</option>
                  <option value="10-20+ Guests (Group)">10-20+ Guests (Group)</option>
                </select>
              </div>
            </div>

            <!-- Special Requests -->
            <div>
              <label for="booking-notes" class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                id="booking-notes"
                formControlName="notes"
                rows="2"
                placeholder="e.g. Floodlights required for match, or reserved table close to the live band stage."
                class="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                class="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60 transition-all cursor-pointer"
              >
                <mat-icon class="!w-4 !h-4 !text-base leading-none">chat</mat-icon>
                <span>Send via WhatsApp to Front Desk</span>
              </button>

              <a
                [href]="'tel:' + site.phoneRaw"
                class="w-full sm:w-auto py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <mat-icon class="!w-4 !h-4 !text-base text-amber-400">call</mat-icon>
                <span>Call Directly</span>
              </a>
            </div>

            <p class="text-[11px] text-neutral-500 text-center">
              📍 Okwuta Road by Ahiaeke Junction, Umuahia · Open 24 Hours Daily
            </p>
          </form>
        </div>
      </div>
    }
  `
})
export class ReservationModal {
  readonly site = NAVEDA_SITE;
  readonly isOpen = input<boolean>(false);
  readonly initialTarget = input<string>('');
  readonly modalClose = output<void>();

  private readonly fb = new FormBuilder();

  readonly form = this.fb.group({
    category: ['5-a-Side AstroTurf Pitch Slot', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    date: ['', Validators.required],
    time: ['7:00 PM', Validators.required],
    guests: ['3-5 Guests', Validators.required],
    notes: ['']
  });

  closeModal(): void {
    this.modalClose.emit();
  }

  submitBooking(): void {
    const val = this.form.value;
    const msg = `*RESERVATION REQUEST - NAVEDA WORLD*\n` +
      `Area/Category: ${val.category || 'General'}\n` +
      `Name: ${val.name || 'Valued Guest'}\n` +
      `Phone: ${val.phone || 'N/A'}\n` +
      `Date: ${val.date || 'Soon'}\n` +
      `Time/Slot: ${val.time || 'N/A'}\n` +
      `Party Size: ${val.guests || '1-2'}\n` +
      (val.notes ? `Special Notes: ${val.notes}\n` : '') +
      `\nSent from Naveda World Website.`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${this.site.whatsappRaw}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.closeModal();
  }
}
