import React, { useState, useEffect, useCallback } from 'react';
import {
  GeoLocationResult,
  WeatherData,
  TemperatureUnit,
} from './types';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastCards } from './components/ForecastCards';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { HourlyForecast } from './components/HourlyForecast';
import { ErrorAlert } from './components/ErrorAlert';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { CloudSun, RefreshCw, Info } from 'lucide-react';

const RECENT_CITIES_KEY = 'weather_intel_recent_cities_v1';

export default function App() {
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<GeoLocationResult[]>([]);
  const [activeCity, setActiveCity] = useState<GeoLocationResult | null>(null);

  // Load recent cities from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_CITIES_KEY);
      if (saved) {
        setRecentCities(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save city to recent list
  const saveRecentCity = (city: GeoLocationResult) => {
    setRecentCities((prev) => {
      const filtered = prev.filter(
        (item) => item.name.toLowerCase() !== city.name.toLowerCase()
      );
      const updated = [city, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_CITIES_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  /**
   * Fetch weather forecast using Open-Meteo Forecast API
   */
  const fetchWeather = useCallback(async (location: GeoLocationResult) => {
    setIsLoading(true);
    setErrorMessage(null);
    setActiveCity(location);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max,uv_index_max&hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather service returned HTTP ${response.status}`);
      }

      const data: WeatherData = await response.json();

      if (!data || !data.current_weather) {
        throw new Error('Incomplete weather data received from Open-Meteo.');
      }

      data.locationInfo = location;
      setWeatherData(data);
      saveRecentCity(location);
    } catch (err: unknown) {
      console.error('Weather fetch error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Could not fetch weather data. Please check connection and try again.';
      setErrorMessage(msg);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Search city by name using Open-Meteo Geocoding API
   */
  const handleCitySearchByName = async (cityName: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName.trim()
      )}&count=1&language=en&format=json`;

      const res = await fetch(geocodingUrl);
      if (!res.ok) {
        throw new Error('Geocoding service unavailable.');
      }

      const geoData = await res.json();

      if (!geoData || !geoData.results || geoData.results.length === 0) {
        throw new Error(`No location found matching "${cityName}". Please verify city spelling.`);
      }

      const cityResult: GeoLocationResult = geoData.results[0];
      await fetchWeather(cityResult);
    } catch (err: unknown) {
      console.error('Geocoding error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : `City "${cityName}" was not found. Please try another location.`;
      setErrorMessage(msg);
      setWeatherData(null);
      setIsLoading(false);
    }
  };

  /**
   * Browser Geolocation detection
   */
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Reverse geocode or fetch nearest city name if available
          let locationName = 'Your Location';
          let countryName = '';

          try {
            const revRes = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(
                2
              )}&count=1`
            );
            const revData = await revRes.json();
            if (revData?.results?.[0]) {
              locationName = revData.results[0].name;
              countryName = revData.results[0].country || '';
            }
          } catch {
            // Fallback to coordinates
          }

          const userLoc: GeoLocationResult = {
            id: Date.now(),
            name: locationName,
            latitude: lat,
            longitude: lon,
            country: countryName,
          };

          await fetchWeather(userLoc);
        } catch {
          setErrorMessage('Unable to retrieve weather for current location.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLocating(false);
        setErrorMessage(
          'Location access was denied or unavailable. You can search any city above.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Initial load: Default to Tokyo or Paris
  useEffect(() => {
    const defaultCity: GeoLocationResult = {
      id: 1850147,
      name: 'Tokyo',
      latitude: 35.6895,
      longitude: 139.6917,
      country: 'Japan',
    };
    fetchWeather(defaultCity);
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-sky-500 selection:text-white">
      {/* Header Bar */}
      <Header
        unit={unit}
        onUnitToggle={(u) => setUnit(u)}
        onUseLocation={handleUseLocation}
        isLocating={isLocating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Bar Component */}
        <SearchBar
          onSelectCity={(city) => fetchWeather(city)}
          isLoading={isLoading}
          recentCities={recentCities}
        />

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error Message */}
        {!isLoading && errorMessage && (
          <ErrorAlert
            message={errorMessage}
            onRetry={() => {
              if (activeCity) {
                fetchWeather(activeCity);
              } else {
                handleCitySearchByName('Tokyo');
              }
            }}
            onSearchFallback={(city) => handleCitySearchByName(city)}
          />
        )}

        {/* Weather Dashboard Content */}
        {!isLoading && !errorMessage && weatherData && (
          <div className="space-y-8 animate-fade-in">
            {/* Current Weather Card */}
            <CurrentWeatherCard data={weatherData} unit={unit} />

            {/* Weather Intelligence & Smart Recommendations */}
            <PlanningRecommendations data={weatherData} />

            {/* 7-Day Forecast Cards */}
            <ForecastCards daily={weatherData.daily} unit={unit} />

            {/* 24-Hour Temperature Timeline */}
            <HourlyForecast hourly={weatherData.hourly} unit={unit} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-sky-600" />
            <span className="font-semibold text-slate-700">
              Weather Intelligence Web Application
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Powered by Open-Meteo REST API</span>
            <span>•</span>
            <span>Client-side Static Architecture</span>
          </div>

          {activeCity && (
            <button
              onClick={() => fetchWeather(activeCity)}
              className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              Refresh Data
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
