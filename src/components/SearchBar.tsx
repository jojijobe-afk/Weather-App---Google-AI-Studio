import React, { useState, useEffect, useRef } from 'react';
import { GeoLocationResult } from '../types';
import { Search, MapPin, X, Clock, Navigation } from 'lucide-react';

interface SearchBarProps {
  onSelectCity: (city: GeoLocationResult) => void;
  isLoading: boolean;
  recentCities: GeoLocationResult[];
  onClearRecent?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  isLoading,
  recentCities,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search for suggestions from Open-Meteo Geocoding API
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query.trim()
        )}&count=6&language=en&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results && Array.isArray(data.results)) {
            setSuggestions(data.results);
          } else {
            setSuggestions([]);
          }
        })
        .catch(() => setSuggestions([]))
        .finally(() => setIsSearching(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else {
      // Direct search fallback
      setIsSearching(true);
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query.trim()
        )}&count=1&language=en&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results && data.results.length > 0) {
            handleSelect(data.results[0]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsSearching(false));
    }
  };

  const handleSelect = (city: GeoLocationResult) => {
    onSelectCity(city);
    setQuery(`${city.name}${city.country ? `, ${city.country}` : ''}`);
    setIsOpen(false);
  };

  const defaultCities: GeoLocationResult[] = [
    { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France' },
    { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan' },
    { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States' },
    { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom' },
    { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      <div className="relative" ref={dropdownRef}>
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5 text-sky-600" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search city name (e.g., Tokyo, Paris, New York)..."
            className="w-full pl-11 pr-24 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-900 text-sm sm:text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="absolute right-16 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-500/20 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Suggestion Dropdown */}
        {isOpen && (suggestions.length > 0 || isSearching) && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-40 overflow-hidden divide-y divide-slate-100">
            {isSearching && (
              <div className="p-3 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                Searching Open-Meteo cities...
              </div>
            )}
            {!isSearching &&
              suggestions.map((item) => (
                <button
                  key={`${item.id}-${item.latitude}-${item.longitude}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-sky-50/70 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-700">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {[item.admin1, item.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Quick Location Pills: Recent & Default Cities */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Quick Select:
        </span>
        {recentCities.length > 0
          ? recentCities.slice(0, 4).map((city) => (
              <button
                key={`recent-${city.id}-${city.name}`}
                onClick={() => onSelectCity(city)}
                className="px-2.5 py-1 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-all flex items-center gap-1"
              >
                <Navigation className="w-2.5 h-2.5 text-sky-500" />
                {city.name}
              </button>
            ))
          : defaultCities.map((city) => (
              <button
                key={`default-${city.id}`}
                onClick={() => onSelectCity(city)}
                className="px-2.5 py-1 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-all flex items-center gap-1"
              >
                {city.name}
              </button>
            ))}
      </div>
    </div>
  );
};
