import { Injectable, signal } from '@angular/core';

export type AtmosphereMode = 'ultra' | 'golden' | 'night' | 'natural';

export interface AtmosphereOption {
  id: AtmosphereMode;
  label: string;
  icon: string;
  description: string;
  cssClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class Atmosphere {
  readonly currentMode = signal<AtmosphereMode>('ultra');

  readonly options: AtmosphereOption[] = [
    {
      id: 'ultra',
      label: 'Ultra Vivid ⚡',
      icon: 'bolt',
      description: 'Maximum color pop, crisp contrast, vibrant green turf & billiard felt',
      cssClass: 'atmosphere-ultra'
    },
    {
      id: 'golden',
      label: 'Golden Hour 🌅',
      icon: 'wb_sunny',
      description: 'Warm glowing sunlight, golden brass lamp tones, sunset vibe',
      cssClass: 'atmosphere-golden'
    },
    {
      id: 'night',
      label: 'VIP Nightlife 🌙',
      icon: 'nightlife',
      description: 'Lounge contrast, glowing ambient lights and deep sports greens',
      cssClass: 'atmosphere-night'
    },
    {
      id: 'natural',
      label: 'Pure Daylight ☀️',
      icon: 'light_mode',
      description: 'True-to-life crisp camera fidelity as photographed',
      cssClass: 'atmosphere-natural'
    }
  ];

  setMode(mode: AtmosphereMode): void {
    this.currentMode.set(mode);
  }

  getCurrentCssClass(): string {
    const found = this.options.find(o => o.id === this.currentMode());
    return found ? found.cssClass : 'atmosphere-ultra';
  }
}
