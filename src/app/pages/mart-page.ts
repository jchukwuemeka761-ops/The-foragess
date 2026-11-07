import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { NAVEDA_MART_HIGHLIGHTS, NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-mart-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Header Banner -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">storefront</mat-icon>
            <span>Naveda Mart · Shopping Mall & Cookware</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Naveda Mart: Gourmet & Cookware Mall
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Your one-stop shopping destination within the Naveda World Complex. Premium commercial cookware, traditional hand-carved Iroko mortars, exotic beverages, imported groceries, and sports accessories.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING WITH BACKGROUND PHOTO: GRAND ENTRANCE & NAVEDA MART (naveda_222222) -->
        <app-subheading-banner
          [imageSrc]="photos.entranceSignage.imageSrc"
          [title]="'Recreational Provisions, Sports Gear & Lifestyle Shopping'"
          [subtitle]="'Equip your home kitchen and sports team with top-tier gear, matchday footballs, cold provisions, and luxury goods located directly on site.'"
          [badge]="'Mall & Lifestyle Hub'"
          [badgeIcon]="'shopping_bag'"
          [location]="'Ground Floor Mall · Naveda Complex'"
          [accent]="'orange'"
          [highlights]="['Official sports gear & footballs', 'Pro heavy-duty cookware', 'Direct WhatsApp ordering & delivery']"
          [actionLabel]="'Order Provisions on WhatsApp'"
          [actionType]="'whatsapp'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction()"
        />

        <!-- Cookware and Gourmet Showcase Grid -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Featured In Mart</span>
              <h2 class="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                Commercial Cookware & Native Kitchen Essentials
              </h2>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (item of martItems; track item.name) {
              <div class="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl space-y-4">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">{{ item.category }}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {{ item.badge }}
                    </span>
                  </div>
                  <h4 class="text-base font-black text-white font-display">{{ item.name }}</h4>
                  <div class="text-xl font-black text-amber-400">{{ item.price }}</div>
                  <p class="text-xs text-neutral-400 leading-relaxed">{{ item.description }}</p>
                </div>

                <a
                  [href]="getMartOrderUrl(item.name, item.price)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-amber-500/30"
                >
                  <mat-icon class="!w-4 !h-4 !text-base">shopping_cart</mat-icon>
                  <span>Inquire / Purchase</span>
                </a>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class MartPage {
  readonly photos = NAVEDA_PHOTOS;
  readonly martItems = NAVEDA_MART_HIGHLIGHTS;
  readonly site = NAVEDA_SITE;

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(): void {
    const text = encodeURIComponent(`Hello Naveda Mart, I would like to inquire about items available at your store.`);
    window.open(`https://wa.me/${this.site.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  getMartOrderUrl(name: string, price: string): string {
    const text = encodeURIComponent(`Hello Naveda Mart, I want to purchase: ${name} (${price}). Is it in stock for pickup/delivery?`);
    return `https://wa.me/${this.site.whatsappRaw}?text=${text}`;
  }
}
