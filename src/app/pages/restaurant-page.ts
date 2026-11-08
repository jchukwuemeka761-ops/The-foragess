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
            Restaurant & Authentic Cuisine
          </h1>

          <p class="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Savor authentic Eastern Nigerian native delicacies, royal pepper soups, sharing platters, and ocean seafood. Every single dish is freshly prepared and accompanied by its own spectacular culinary photograph.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SUBHEADING 1 WITH BACKGROUND PHOTO: THE LANDMARK ARCHITECTURAL COMPLEX (naveda_1111) -->
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
                placeholder="Search Nkwobi, Ofe Nsala, Snails..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Dishes Grid: Boldly Visible Individual Dish Photos (Zero Duplicates!) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of filteredMenu(); track item.id) {
            <div
              class="rounded-2xl overflow-hidden bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <!-- Boldly Visible Spectacular Dish Photograph -->
              <div class="relative w-full h-52 sm:h-56 overflow-hidden bg-neutral-950">
                <img
                  [src]="item.image"
                  [alt]="item.name"
                  class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerpolicy="no-referrer"
                />

                <!-- Category badge pill -->
                <div class="absolute top-3 left-3 z-10">
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40 shadow-sm">
                    {{ item.categoryTitle }}
                  </span>
                </div>

                <!-- Spicy Level Badge -->
                @if (item.spicyLevel) {
                  <div class="absolute top-3 right-3 z-10">
                    <span
                      class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm"
                      [class]="getSpiceBadgeClass(item.spicyLevel)"
                    >
                      {{ item.spicyLevel }}
                    </span>
                  </div>
                }

                <!-- Portion and Prep Time Chip (Bottom Left) -->
                <div class="absolute bottom-2.5 left-3 z-10">
                  <span class="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-black/75 backdrop-blur-sm text-neutral-200 border border-white/20">
                    {{ item.portion }} · {{ item.prepTime }}
                  </span>
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2.5">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="text-lg font-black text-white font-display group-hover:text-amber-300 transition-colors leading-snug">
                      {{ item.name }}
                    </h3>
                    @if (item.badge) {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                        {{ item.badge }}
                      </span>
                    }
                  </div>

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

                <!-- Price & Order Action -->
                <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <div class="text-xl font-black text-amber-400">{{ item.price }}</div>
                    <div class="text-[10px] text-neutral-500 uppercase tracking-wider">Fresh to Order</div>
                  </div>

                  <a
                    [href]="getOrderItemUrl(item)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40"
                  >
                    <mat-icon class="!w-4 !h-4 !text-base">chat</mat-icon>
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- SUBHEADING 2 WITH BACKGROUND PHOTO: BILLIARDS & BITES SOCIAL LOUNGE (naveda2222) -->
        <app-subheading-banner
          [imageSrc]="photos.poolVines.imageSrc"
          [title]="'Billiards & Bites Social Lounge'"
          [subtitle]="'Pair our signature native delicacies and cold draught brews with exciting 8-ball billiards under lush hanging vines and warm acoustic mood lighting.'"
          [badge]="'Lounge Gastronomy'"
          [badgeIcon]="'sports_bar'"
          [location]="'Upper Billiards Lounge · Naveda Complex'"
          [accent]="'emerald'"
          [highlights]="['Full menu delivery to pool tables', 'Sub-zero beer towers', 'Late night native meals 24/7']"
          [actionLabel]="'Reserve Lounge Pool & Dining'"
          [actionType]="'pool'"
          (openLightbox)="onPhotoLightbox($event)"
          (openAction)="onAction($event)"
        />

        <!-- SUBHEADING 3 WITH BACKGROUND PHOTO: TERRACE COCKTAILS & SUNLIT POOL (naveda_22) -->
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
    { id: 'all', label: 'All Dishes' },
    { id: 'native', label: 'Eastern Nigerian Native' },
    { id: 'mains', label: 'Pan-African Entrées' },
    { id: 'seafood', label: 'Ocean Seafood' },
    { id: 'starters', label: 'Pepper Soups & Starters' },
    { id: 'tango', label: 'Sharing Platters' }
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

  getSpiceBadgeClass(level: string): string {
    switch (level) {
      case 'Extra Hot':
        return 'bg-red-950/85 text-red-300 border border-red-500/50';
      case 'Hot':
        return 'bg-orange-950/85 text-orange-300 border border-orange-500/50';
      case 'Medium':
        return 'bg-amber-950/85 text-amber-300 border border-amber-500/50';
      case 'Mild':
      default:
        return 'bg-emerald-950/85 text-emerald-300 border border-emerald-500/50';
    }
  }

  getOrderItemUrl(item: MenuItem): string {
    const text = encodeURIComponent(`Hello Naveda World, I would like to order: ${item.name} (${item.price}) for table reservation / takeaway.`);
    return `https://wa.me/${this.site.whatsappRaw}?text=${text}`;
  }
}
