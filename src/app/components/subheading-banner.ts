import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Atmosphere } from '../services/atmosphere';

@Component({
  selector: 'app-subheading-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      class="subheading-bg-container group relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-amber-500/30 hover:border-amber-400/80 transition-all duration-500 shadow-2xl my-8 md:my-12"
      [class]="heightClass()"
    >
      <!-- Background Photo with Atmospheric Vibrancy Filters -->
      <img
        [src]="imageSrc()"
        [alt]="imageAlt()"
        class="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        [class]="atmosphere.getCurrentCssClass()"
        referrerpolicy="no-referrer"
      />

      <!-- Luminance Preserving Gradient Overlay: Leaves center & top bright so photos are vivid and visible -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/45 to-black/15 pointer-events-none"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/35 to-transparent pointer-events-none"
      ></div>

      <!-- Radiant glow accents around edges -->
      <div
        class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
      ></div>

      <!-- Floating 4K Lightbox Trigger Button (Top Right) -->
      <div class="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          (click)="onLightboxClick()"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950/80 hover:bg-neutral-900 backdrop-blur-md border border-amber-500/40 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-lg cursor-pointer"
          title="Click to view full high-res photo"
        >
          <mat-icon class="!w-4 !h-4 !text-base leading-none">fullscreen</mat-icon>
          <span class="hidden sm:inline">View Full 4K Photo</span>
        </button>
      </div>

      <!-- Location Pin Pill (Top Left) -->
      @if (location()) {
        <div class="absolute top-4 left-4 z-20">
          <div
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-neutral-200 text-xs font-medium"
          >
            <mat-icon class="!w-3.5 !h-3.5 !text-sm text-amber-400">place</mat-icon>
            <span>{{ location() }}</span>
          </div>
        </div>
      }

      <!-- Main Content Block anchored to bottom-left with glassmorphic depth -->
      <div class="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8 md:p-12 max-w-4xl">
        <!-- Subheading Badge -->
        <div class="mb-3">
          <span
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg"
            [class]="getBadgeClasses()"
          >
            @if (badgeIcon()) {
              <mat-icon class="!w-4 !h-4 !text-base leading-none">{{ badgeIcon() }}</mat-icon>
            }
            {{ badge() }}
          </span>
        </div>

        <!-- Prominent Subheading Title (Clean, crisp, legible over vivid background) -->
        <h2
          class="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white font-display text-photo-heading mb-3 leading-tight"
        >
          {{ title() }}
        </h2>

        <!-- High-contrast Subtitle -->
        <p
          class="text-sm sm:text-base md:text-lg text-neutral-100 text-photo-sub font-normal max-w-2xl leading-relaxed mb-5"
        >
          {{ subtitle() }}
        </p>

        <!-- Highlights Chips -->
        @if (highlights() && highlights().length > 0) {
          <div class="flex flex-wrap items-center gap-2 mb-6">
            @for (item of highlights(); track item) {
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-950/70 backdrop-blur-md border border-white/25 text-white text-xs font-medium shadow-sm"
              >
                <mat-icon class="!w-3.5 !h-3.5 !text-sm text-emerald-400">check_circle</mat-icon>
                <span>{{ item }}</span>
              </span>
            }
          </div>
        }

        <!-- Interactive CTA Buttons -->
        <div class="flex flex-wrap items-center gap-3">
          @if (actionLabel()) {
            <button
              type="button"
              (click)="onActionClick()"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-950/60 cursor-pointer transform hover:-translate-y-0.5"
            >
              <mat-icon class="!w-4 !h-4 !text-base leading-none">{{ getActionIcon() }}</mat-icon>
              <span>{{ actionLabel() }}</span>
            </button>
          }

          <button
            type="button"
            (click)="onLightboxClick()"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 backdrop-blur-md border border-amber-500/40 hover:border-amber-300 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <mat-icon class="!w-4 !h-4 !text-base leading-none text-amber-400">zoom_in</mat-icon>
            <span>Inspect Venue Space</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SubheadingBanner {
  readonly atmosphere = inject(Atmosphere);

  readonly imageSrc = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly badge = input.required<string>();
  readonly badgeIcon = input<string>('star');
  readonly location = input<string>('');
  readonly accent = input<'emerald' | 'amber' | 'cyan' | 'purple' | 'orange'>('amber');
  readonly highlights = input<readonly string[] | string[]>([]);
  readonly heightClass = input<string>('min-h-[340px] sm:min-h-[420px] md:min-h-[460px]');
  readonly actionLabel = input<string>('');
  readonly actionType = input<string>('reservation');
  readonly imageAlt = input<string>('Naveda Venue Photo');

  readonly openLightbox = output<string>();
  readonly openAction = output<{ type: string; title: string }>();

  onLightboxClick(): void {
    this.openLightbox.emit(this.imageSrc());
  }

  onActionClick(): void {
    this.openAction.emit({
      type: this.actionType(),
      title: this.title()
    });
  }

  getBadgeClasses(): string {
    switch (this.accent()) {
      case 'emerald':
        return 'bg-emerald-950/85 text-emerald-300 border border-emerald-400/50';
      case 'cyan':
        return 'bg-cyan-950/85 text-cyan-300 border border-cyan-400/50';
      case 'purple':
        return 'bg-purple-950/85 text-purple-300 border border-purple-400/50';
      case 'orange':
        return 'bg-orange-950/85 text-orange-300 border border-orange-400/50';
      case 'amber':
      default:
        return 'bg-amber-950/85 text-amber-300 border border-amber-400/50';
    }
  }

  getActionIcon(): string {
    const type = this.actionType();
    if (type === 'pitch') return 'sports_soccer';
    if (type === 'pool') return 'sports_bar';
    if (type === 'menu') return 'restaurant_menu';
    return 'calendar_today';
  }
}
