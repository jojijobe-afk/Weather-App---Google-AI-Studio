import React from 'react';
import { WeatherData } from '../types';
import {
  generatePlanningRecommendations,
  getActivityRatings,
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Compass,
} from 'lucide-react';

interface PlanningRecommendationsProps {
  data: WeatherData;
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({
  data,
}) => {
  const recommendations = generatePlanningRecommendations(data);
  const activities = getActivityRatings(data);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin-slow" />
            Weather Intelligence & Planning Recommendations
          </h2>
          <p className="text-xs text-slate-500">
            Actionable advisories and outdoor activity suitability derived from current & 7-day metrics.
          </p>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recommendations.map((rec) => {
          let badgeColor = 'bg-sky-50 text-sky-700 border-sky-200';
          let iconBg = 'bg-sky-100 text-sky-600';
          let PriorityIcon = Info;

          if (rec.priority === 'high') {
            badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
            iconBg = 'bg-rose-100 text-rose-600';
            PriorityIcon = AlertTriangle;
          } else if (rec.priority === 'positive') {
            badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            iconBg = 'bg-emerald-100 text-emerald-600';
            PriorityIcon = CheckCircle2;
          } else if (rec.priority === 'medium') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
            iconBg = 'bg-amber-100 text-amber-600';
            PriorityIcon = AlertTriangle;
          }

          return (
            <div
              key={rec.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
            >
              <div
                className={`p-3 rounded-2xl ${iconBg} shrink-0 border border-black/5`}
              >
                <WeatherIcon name={rec.icon} className="w-6 h-6" />
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {rec.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}
                  >
                    <PriorityIcon className="w-3 h-3" />
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outdoor Activity Suitability Grid */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Outdoor Activity Suitability Index
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Real-time Condition Match
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activities.map((act) => {
            let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            if (act.status === 'Moderate') {
              statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
            } else if (act.status === 'Unfavorable') {
              statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
            } else if (act.status === 'Ideal') {
              statusBadge = 'bg-sky-50 text-sky-700 border-sky-200';
            }

            return (
              <div
                key={act.name}
                className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-indigo-600 shadow-2xs">
                      <WeatherIcon name={act.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {act.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge}`}
                  >
                    {act.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  {act.reason}
                </p>

                {/* Star rating indicators */}
                <div className="flex items-center gap-1 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`h-1.5 flex-1 rounded-full ${
                        star <= act.score
                          ? act.score >= 4
                            ? 'bg-emerald-500'
                            : act.score === 3
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
