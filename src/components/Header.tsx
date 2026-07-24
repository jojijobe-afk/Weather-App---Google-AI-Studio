import React from 'react';
import { TemperatureUnit } from '../types';
import { CloudSun, Navigation, Sparkles } from 'lucide-react';

interface HeaderProps {
  unit: TemperatureUnit;
  onUnitToggle: (unit: TemperatureUnit) => void;
  onUseLocation: () => void;
  isLocating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onUnitToggle,
  onUseLocation,
  isLocating,
}) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <CloudSun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Weather<span className="text-sky-600">Intel</span>
              </h1>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5 text-sky-500" />
                Live
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Open-Meteo Powered Intelligence
            </p>
          </div>
        </div>

        {/* Right Controls: Geolocation & Unit Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onUseLocation}
            disabled={isLocating}
            title="Use current geolocation"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:scale-95 transition-all disabled:opacity-50 border border-slate-200"
          >
            <Navigation
              className={`w-3.5 h-3.5 text-sky-600 ${
                isLocating ? 'animate-spin' : ''
              }`}
            />
            <span className="hidden xs:inline">
              {isLocating ? 'Locating...' : 'My Location'}
            </span>
          </button>

          {/* Unit Switcher Button Group */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => onUnitToggle('C')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                unit === 'C'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitToggle('F')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                unit === 'F'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
