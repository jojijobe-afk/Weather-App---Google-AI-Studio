import React from 'react';
import { HourlyForecast as HourlyType, TemperatureUnit } from '../types';
import { getWeatherDetails, formatTemp, formatLocalTime } from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
  hourly?: HourlyType;
  unit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, unit }) => {
  if (!hourly || !hourly.time || hourly.time.length === 0) return null;

  // Take the next 24 hours
  const next24 = hourly.time.slice(0, 24);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900">
            24-Hour Temperature Timeline
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Scroll horizontally →
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        {next24.map((isoTime, idx) => {
          const temp = hourly.temperature_2m[idx];
          const code = hourly.weathercode[idx];
          const details = getWeatherDetails(code);
          const timeLabel = formatLocalTime(isoTime);

          return (
            <div
              key={isoTime}
              className={`min-w-[85px] p-3 rounded-2xl border text-center flex flex-col items-center gap-2 shrink-0 transition-all ${
                idx === 0
                  ? 'bg-sky-50/80 border-sky-200 text-sky-900 font-semibold'
                  : 'bg-slate-50/60 border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
              }`}
            >
              <span className="text-[11px] font-medium text-slate-500">
                {idx === 0 ? 'Now' : timeLabel.split(' ')[0]}
                <span className="text-[9px] text-slate-400 block lowercase">
                  {timeLabel.split(' ')[1]}
                </span>
              </span>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <WeatherIcon name={details.icon} className={`w-5 h-5 ${details.textColor}`} />
              </div>

              <span className="text-xs font-bold text-slate-900">
                {formatTemp(temp, unit)}
              </span>

              {hourly.precipitation_probability?.[idx] !== undefined && (
                <span className="text-[10px] font-mono text-sky-600">
                  {hourly.precipitation_probability[idx]}% rain
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
