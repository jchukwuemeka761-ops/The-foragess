import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SubheadingBanner } from '../components/subheading-banner';
import { MenuItem, NAVEDA_MENU_ITEMS, NAVEDA_PHOTOS, NAVEDA_SITE } from '../data/naveda.data';

@Component({
  selector: 'app-restaurant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SubheadingBanner],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Header Banner -->
      <section class="relative py-12 md:py-16 border-b border-amber-500/20 bg-neutral-950/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <mat-icon class="!w-4 !h-4 !text-base">restaurant</mat-icon>
            <span>Naveda Restaurant & World Bites · 24 Hours Daily</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Restaurant & 82 Authentic Dishes
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            From sizzling Nkwobi in traditional wooden mortars and royal Ofe Nsala with fluffy pounded yam, to grilled fresh river catfish and handcrafted cocktails. Prepared 24 hours round the clock in Umuahia.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING 1 WITH BACKGROUND PHOTO: THE LANDMARK DINING COMPLEX (naveda_1111) -->
        <app-subheading-banner
          [imageSrc]="photos.buildingExterior.imageSrc"
          [title]="'The Landmark Fine Dining Complex at Ahiaeke Junction'"
          [subtitle]="'Experience luxury multi-floor hospitality, air-conditioned executive dining rooms, and authentic Eastern Nigerian gastronomy served around the clock.'"
          [badge]="'Executive Dining'"
          [badgeIcon]="'restaurant'"
          [location]="'Naveda Complex · Okwuta Road by Ahiaeke Junction'"
          [accent]="'orange'"
          [highlights]="['Air-conditioned VIP private dining rooms', 'Full native and continental culinary brigade', 'Continuous 24-hour kitchen service']"
          [actionLabel]="'Reserve Executive Dining Table'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- Interactive Menu Filter Toolbar -->
        <div class="space-y-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <!-- Category Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
              @for (cat of categories; track cat.id) {
                <button
                  type="button"
                  (click)="selectedCategory.set(cat.id)"
                  class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer"
                  [class]="
                    selectedCategory() === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-black shadow-md'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  "
                >
                  {{ cat.label }}
                </button>
              }
            </div>

            <!-- Search Field -->
            <div class="relative w-full md:w-72">
              <mat-icon class="absolute left-3.5 top-1/2 -translate-y-1/2 !w-4 !h-4 !text-base text-neutral-400">
                search
              </mat-icon>
              <input
                type="text"
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                placeholder="Search Nkwobi, Catfish, Asun..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Dishes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of filteredMenu(); track item.id) {
            <div
              class="rounded-2xl p-6 bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl space-y-4 group"
            >
              <div class="space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {{ item.categoryTitle }}
                  </span>
                  @if (item.badge) {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {{ item.badge }}
                    </span>
                  }
                </div>

                <h3 class="text-lg font-black text-white font-display group-hover:text-amber-300 transition-colors">
                  {{ item.name }}
                </h3>

                <p class="text-xs text-neutral-300 leading-relaxed">
                  {{ item.description }}
                </p>

                <!-- Ingredients -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  @for (ing of item.ingredients; track ing) {
                    <span class="text-[10px] px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-400">
                      {{ ing }}
                    </span>
                  }
                </div>
              </div>

              <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div class="text-xl font-black text-amber-400">{{ item.price }}</div>
                  <div class="text-[11px] text-neutral-500">{{ item.portion }} · {{ item.prepTime }}</div>
                </div>

                <a
                  [href]="getOrderItemUrl(item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-amber-500/30"
                >
                  <mat-icon class="!w-4 !h-4 !text-base">chat</mat-icon>
                  <span>Order Now</span>
                </a>
              </div>
            </div>
          }
        </div>

        <!-- SUBHEADING 2 WITH BACKGROUND PHOTO: TERRACE COCKTAILS & SUNLIT POOL -->
        <app-subheading-banner
          [imageSrc]="photos.poolTerrace.imageSrc"
          [title]="'Terrace Bites, Crafted Cocktails & Garden Breeze'"
          [subtitle]="'Pair our signature royal Nigerian Chapman, Hennessy Twilight Cognac, and chilled brews with mouth-watering native delicacies under open-air palm trees.'"
          [badge]="'Garden Terrace Lounge'"
          [badgeIcon]="'local_bar'"
          [location]="'Garden Terrace · Naveda Complex'"
          [accent]="'cyan'"
          [highlights]="['Artisanal mixology', 'Breezy open terrace seating', 'Late-night cocktail service 24/7']"
          [actionLabel]="'Reserve Garden Terrace Table'"
          [actionType]="'reservation'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

      </div>
    </div>
  `
})
export class RestaurantPage {
  readonly photos = NAVEDA_PHOTOS;
  readonly menu = NAVEDA_MENU_ITEMS;
  readonly site = NAVEDA_SITE;

  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');

  readonly categories = [
    { id: 'all', label: 'All 82 Dishes' },
    { id: 'native', label: 'Eastern Nigerian Native' },
    { id: 'starters', label: 'Pepper Soups & Starters' },
    { id: 'grills', label: 'Charcoal Grills & Catfish' },
    { id: 'tango', label: 'Tango for Two Platters' },
    { id: 'mains', label: 'Pan-African Mains' },
    { id: 'cocktails', label: 'Cocktails & Brews' }
  ];

  readonly filteredMenu = computed(() => {
    let items = this.menu;
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'all') {
      items = items.filter(i => i.category === cat);
    }

    if (query) {
      items = items.filter(
        i =>
          i.name.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }

    return items;
  });

  readonly openLightbox = output<string>();
  readonly openReservation = output<string>();

  onPhotoLightbox(src: string): void {
    this.openLightbox.emit(src);
  }

  onAction(event: { type: string; title: string }): void {
    this.openReservation.emit(event.title);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  getOrderItemUrl(item: MenuItem): string {
    const text = encodeURIComponent(`Hello Naveda World, I would like to order: ${item.name} (${item.price}) for table reservation / takeaway.`);
    return `https://wa.me/${this.site.whatsappRaw}?text=${text}`;
  }
}
