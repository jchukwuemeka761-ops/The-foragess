import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Atmosphere, AtmosphereMode } from '../services/atmosphere';

@Component({
  selector: 'app-atmosphere-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      class="w-full bg-neutral-900/95 border-y border-amber-500/20 backdrop-blur-md px-4 py-2.5 sm:px-6"
    >
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <!-- Explanatory Label -->
        <div class="flex items-center gap-2 text-neutral-300">
          <mat-icon class="!w-4 !h-4 !text-base text-amber-400">tune</mat-icon>
          <span class="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Photo Atmosphere & Vibrancy:</span>
          <span class="hidden md:inline text-neutral-400">
            Preview the venue backgrounds in real-time lighting presets
          </span>
        </div>

        <!-- Mode Buttons -->
        <div class="flex items-center gap-1.5 flex-wrap">
          @for (opt of atmosphere.options; track opt.id) {
            <button
              type="button"
              (click)="onSelect(opt.id)"
              class="px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer text-xs"
              [class]="
                atmosphere.currentMode() === opt.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 shadow-md font-black'
                  : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60'
              "
              [title]="opt.description"
            >
              <mat-icon class="!w-3.5 !h-3.5 !text-sm leading-none">{{ opt.icon }}</mat-icon>
              <span>{{ opt.label }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class AtmosphereToolbar {
  readonly atmosphere = inject(Atmosphere);

  onSelect(mode: AtmosphereMode): void {
    this.atmosphere.setMode(mode);
  }
}
