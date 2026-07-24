import React from 'react';
import { WeatherData, TemperatureUnit } from '../types';
import {
  getWeatherDetails,
  formatTemp,
  formatLocalTime,
  formatDateLabel,
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Wind, MapPin, Clock, Calendar, Droplets, ArrowUpRight } from 'lucide-react';

interface CurrentWeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  data,
  unit,
}) => {
  const current = data.current_weather;
  const location = data.locationInfo;
  const weatherDetails = getWeatherDetails(current.weathercode);
  const localTime = formatLocalTime(current.time, data.timezone);
  const dateLabel = formatDateLabel(current.time.split('T')[0] || new Date().toISOString().split('T')[0]);

  // Max and Min for Today
  const maxToday = data.daily?.temperature_2m_max?.[0];
  const minToday = data.daily?.temperature_2m_min?.[0];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-700/50">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Main Temperature & Weather Condition Info */}
        <div className="space-y-4">
          {/* Location Badge & Time */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>
                {location
                  ? `${location.name}${location.country ? `, ${location.country}` : ''}`
                  : 'Selected Location'}
              </span>
              {location?.admin1 && (
                <span className="text-xs text-slate-400 font-normal">
                  ({location.admin1})
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Local Time: {localTime}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {dateLabel}
              </span>
            </div>
          </div>

          {/* Temperature & Large Icon */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-baseline">
              <span className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {formatTemp(current.temperature, unit).replace(/°[CF]/, '')}
              </span>
              <span className="text-2xl sm:text-4xl font-bold text-sky-400 ml-1">
                °{unit}
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 pl-4 border-l border-slate-700/80">
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-inner">
                <WeatherIcon
                  name={weatherDetails.icon}
                  className={`w-10 h-10 ${weatherDetails.textColor}`}
                />
              </div>
              <span className="text-base font-bold text-slate-100">
                {weatherDetails.label}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            {weatherDetails.description}
          </p>
        </div>

        {/* Key Metrics Grid (Wind, Today Max/Min, Timezone) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full md:w-auto md:min-w-[260px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-700/60 md:pl-8">
          {/* Wind Speed Metric */}
          <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Wind Speed</span>
              <Wind className="w-4 h-4 text-sky-400" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white">
                {Math.round(current.windspeed)} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {current.windspeed > 20 ? 'Strong breeze' : 'Gentle breeze'}
              </p>
            </div>
          </div>

          {/* Today's High / Low */}
          <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>High / Low</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
                <span className="text-amber-400">{maxToday !== undefined ? formatTemp(maxToday, unit) : '--'}</span>
                <span className="text-slate-500 font-normal">/</span>
                <span className="text-sky-300">{minToday !== undefined ? formatTemp(minToday, unit) : '--'}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Today's Range</p>
            </div>
          </div>

          {/* Weather Code Indicator */}
          <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>WMO Code</span>
              <Droplets className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white">
                Code {current.weathercode}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 capitalize">
                {weatherDetails.category}
              </p>
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Timezone</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <div className="text-sm font-bold text-white truncate max-w-[110px]" title={data.timezone}>
                {data.timezone ? data.timezone.split('/')[1] || data.timezone : 'Auto'}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                UTC {data.utc_offset_seconds >= 0 ? '+' : ''}
                {Math.round(data.utc_offset_seconds / 3600)}h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
