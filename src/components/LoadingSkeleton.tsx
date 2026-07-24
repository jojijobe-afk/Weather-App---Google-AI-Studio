import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Current Weather Card Skeleton */}
      <div className="w-full bg-slate-800/90 rounded-3xl p-8 h-64 flex flex-col justify-between border border-slate-700">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-5 bg-slate-700 rounded-lg w-48" />
            <div className="h-4 bg-slate-700/60 rounded-lg w-32" />
          </div>
          <div className="w-12 h-12 bg-slate-700 rounded-2xl" />
        </div>

        <div className="flex items-baseline gap-4">
          <div className="h-16 bg-slate-700 rounded-2xl w-40" />
          <div className="h-8 bg-slate-700/60 rounded-xl w-28" />
        </div>

        <div className="h-4 bg-slate-700/60 rounded-lg w-64" />
      </div>

      {/* 7 Day Forecast Skeleton Grid */}
      <div className="space-y-3">
        <div className="h-6 bg-slate-200 rounded-lg w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 h-48 border border-slate-200 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="w-10 h-10 bg-slate-100 rounded-xl mx-auto" />
              <div className="h-4 bg-slate-200 rounded w-16 mx-auto" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
