import React from 'react';
import { AlertCircle, RefreshCw, MapPin, Search } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onSearchFallback?: (cityName: string) => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  onSearchFallback,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-rose-50/90 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 flex-1">
          <h3 className="text-base font-bold text-rose-950">
            Weather Location Not Found
          </h3>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
            {message || 'We could not fetch weather data for the specified location. Please check the spelling of the city or try another search.'}
          </p>

          {/* Quick Suggestions */}
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="text-rose-900/70 font-semibold">Try popular cities:</span>
            {['Tokyo', 'Paris', 'New York', 'London'].map((city) => (
              <button
                key={city}
                onClick={() => onSearchFallback && onSearchFallback(city)}
                className="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-900 border border-rose-200 rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-rose-500" />
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {onRetry && (
        <div className="pt-3 border-t border-rose-200/60 flex justify-center sm:justify-end">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
