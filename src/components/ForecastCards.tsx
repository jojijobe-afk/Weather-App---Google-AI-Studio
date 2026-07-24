import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types';
import {
  getWeatherDetails,
  formatTemp,
  getDayLabel,
  formatDateLabel,
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Calendar } from 'lucide-react';

interface ForecastCardsProps {
  daily: DailyForecast;
  unit: TemperatureUnit;
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({ daily, unit }) => {
  if (!daily || !daily.time || daily.time.length === 0) return null;

  // Calculate weekly overall max and min to render visual temperature bars
  const weeklyMax = Math.max(...daily.temperature_2m_max);
  const weeklyMin = Math.min(...daily.temperature_2m_min);
  const tempSpan = Math.max(weeklyMax - weeklyMin, 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-600" />
          7-Day Weather Outlook
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          High / Low Ranges
        </span>
      </div>

      {/* Grid of 7 Day Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {daily.time.slice(0, 7).map((timeStr, index) => {
          const maxTemp = daily.temperature_2m_max[index];
          const minTemp = daily.temperature_2m_min[index];
          const code = daily.weathercode[index];
          const details = getWeatherDetails(code);
          const dayLabel = getDayLabel(timeStr, index);
          const dateLabel = formatDateLabel(timeStr).split(',')[0]; // e.g. "Jul 24"

          // Relative percentage position for min & max temp visual bar
          const minPercent = Math.max(0, Math.min(100, ((minTemp - weeklyMin) / tempSpan) * 100));
          const maxPercent = Math.max(0, Math.min(100, ((maxTemp - weeklyMin) / tempSpan) * 100));
          const barWidth = Math.max(10, maxPercent - minPercent);

          return (
            <div
              key={timeStr}
              className={`bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                index === 0 ? 'ring-2 ring-sky-500/40 bg-sky-50/20' : ''
              }`}
            >
              {/* Card Header: Day & Date */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {dayLabel}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {dateLabel}
                  </div>
                </div>

                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60"
                  title={`WMO Weather Code: ${code}`}
                >
                  Code {code}
                </span>
              </div>

              {/* Card Body: Icon & Weather Condition */}
              <div className="my-3 flex flex-col items-center text-center space-y-1.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                  <WeatherIcon
                    name={details.icon}
                    className={`w-7 h-7 ${details.textColor}`}
                  />
                </div>
                <div className="text-xs font-semibold text-slate-800 line-clamp-1" title={details.label}>
                  {details.label}
                </div>
              </div>

              {/* Card Footer: Max & Min Temperature */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-rose-600">
                    {formatTemp(maxTemp, unit)}
                  </span>
                  <span className="text-slate-400 font-normal">/</span>
                  <span className="text-sky-600">
                    {formatTemp(minTemp, unit)}
                  </span>
                </div>

                {/* Relative Temperature Range Bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 rounded-full"
                    style={{
                      left: `${minPercent}%`,
                      width: `${barWidth}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
