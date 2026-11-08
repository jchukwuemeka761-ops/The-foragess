import React from 'react';
import { Sparkles, Sun, Moon, Eye } from 'lucide-react';

interface AtmosphereToolbarProps {
  currentAtmosphere: string;
  onSelect: (presetClass: string) => void;
}

export const ATMOSPHERE_PRESETS = [
  {
    id: 'atmosphere-ultra',
    label: 'Ultra Vivid & Crisp',
    badge: 'Recommended',
    icon: Sparkles,
    description: 'Boosted saturation & contrast for brilliant visibility'
  },
  {
    id: 'atmosphere-golden',
    label: 'Golden Hour Glow',
    badge: 'Warmth',
    icon: Sun,
    description: 'Warm amber tones and rich architectural shadows'
  },
  {
    id: 'atmosphere-night',
    label: 'VIP Nightlife Neon',
    badge: 'Stage & Bar',
    icon: Moon,
    description: 'Punchy club contrast for stage & billiards lounge'
  },
  {
    id: 'atmosphere-natural',
    label: 'Pure Daylight',
    badge: 'Natural',
    icon: Eye,
    description: 'Balanced daylight clarity and true-to-life colors'
  }
];

export const AtmosphereToolbar: React.FC<AtmosphereToolbarProps> = ({
  currentAtmosphere,
  onSelect
}) => {
  return (
    <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
      <div className="rounded-2xl border border-amber-500/30 bg-neutral-900/90 p-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Visual Atmosphere Engine
              </p>
              <p className="text-xs text-neutral-300">
                Choose background radiance & visibility mode
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {ATMOSPHERE_PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isSelected = currentAtmosphere === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelect(preset.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 ring-2 ring-amber-400'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-white/5'
                  }`}
                  title={preset.description}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-neutral-950' : 'text-amber-400'}`} />
                  <span>{preset.label}</span>
                  {preset.badge && !isSelected && (
                    <span className="hidden sm:inline rounded bg-neutral-700 px-1.5 py-0.5 text-[10px] text-neutral-300">
                      {preset.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
