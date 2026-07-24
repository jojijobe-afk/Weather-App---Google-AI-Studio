export type TemperatureUnit = 'C' | 'F';

export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  country?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeather {
  time: string;
  interval?: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_sum?: number[];
  windspeed_10m_max?: number[];
  uv_index_max?: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m?: number[];
  weathercode: number[];
  precipitation_probability?: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation?: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily: DailyForecast;
  hourly?: HourlyForecast;
  locationInfo?: GeoLocationResult;
}

export interface WeatherCodeDetails {
  label: string;
  description: string;
  icon: string; // Lucide icon identifier
  bgGradient: string;
  textColor: string;
  category: 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunderstorm';
}

export interface PlanningRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'rain' | 'heat' | 'cold' | 'outdoor' | 'wind' | 'uv' | 'general';
  priority: 'high' | 'medium' | 'positive' | 'info';
  icon: string;
}

export interface ActivityRating {
  name: string;
  status: 'Ideal' | 'Good' | 'Moderate' | 'Unfavorable';
  score: number; // 1 to 5
  icon: string;
  reason: string;
}
