import {
  WeatherCodeDetails,
  PlanningRecommendation,
  WeatherData,
  ActivityRating,
  TemperatureUnit,
} from '../types';

/**
 * Maps WMO Weather Interpretation Codes (WW) to friendly labels, icons, descriptions and theme gradients.
 */
export const WMO_WEATHER_CODES: Record<number, WeatherCodeDetails> = {
  0: {
    label: 'Clear Sky',
    description: 'Bright and sunny clear skies',
    icon: 'Sun',
    bgGradient: 'from-amber-400 to-orange-500',
    textColor: 'text-amber-500',
    category: 'clear',
  },
  1: {
    label: 'Mainly Clear',
    description: 'Mostly sunny with few clouds',
    icon: 'SunDim',
    bgGradient: 'from-amber-300 to-yellow-500',
    textColor: 'text-amber-500',
    category: 'clear',
  },
  2: {
    label: 'Partly Cloudy',
    description: 'Scattered clouds with sun intervals',
    icon: 'CloudSun',
    bgGradient: 'from-sky-400 to-blue-500',
    textColor: 'text-sky-500',
    category: 'cloudy',
  },
  3: {
    label: 'Overcast',
    description: 'Fully overcast cloud cover',
    icon: 'Cloud',
    bgGradient: 'from-slate-400 to-slate-600',
    textColor: 'text-slate-500',
    category: 'cloudy',
  },
  45: {
    label: 'Foggy',
    description: 'Reduced visibility due to fog',
    icon: 'CloudFog',
    bgGradient: 'from-slate-300 to-gray-500',
    textColor: 'text-slate-400',
    category: 'fog',
  },
  48: {
    label: 'Depositing Rime Fog',
    description: 'Freezing fog depositing frost',
    icon: 'CloudFog',
    bgGradient: 'from-teal-300 to-slate-600',
    textColor: 'text-teal-600',
    category: 'fog',
  },
  51: {
    label: 'Light Drizzle',
    description: 'Gentle, fine mist drizzle',
    icon: 'CloudDrizzle',
    bgGradient: 'from-cyan-400 to-blue-600',
    textColor: 'text-blue-500',
    category: 'rain',
  },
  53: {
    label: 'Moderate Drizzle',
    description: 'Steady light drizzle',
    icon: 'CloudDrizzle',
    bgGradient: 'from-cyan-500 to-blue-700',
    textColor: 'text-blue-600',
    category: 'rain',
  },
  55: {
    label: 'Dense Drizzle',
    description: 'Heavy wet drizzle',
    icon: 'CloudDrizzle',
    bgGradient: 'from-blue-500 to-indigo-700',
    textColor: 'text-indigo-600',
    category: 'rain',
  },
  56: {
    label: 'Light Freezing Drizzle',
    description: 'Freezing drizzle mist',
    icon: 'CloudRain',
    bgGradient: 'from-cyan-600 to-slate-700',
    textColor: 'text-cyan-600',
    category: 'rain',
  },
  57: {
    label: 'Dense Freezing Drizzle',
    description: 'Icy freezing drizzle',
    icon: 'CloudRain',
    bgGradient: 'from-cyan-700 to-indigo-800',
    textColor: 'text-cyan-700',
    category: 'rain',
  },
  61: {
    label: 'Slight Rain',
    description: 'Light continuous rain showers',
    icon: 'CloudRain',
    bgGradient: 'from-blue-400 to-indigo-600',
    textColor: 'text-blue-600',
    category: 'rain',
  },
  63: {
    label: 'Moderate Rain',
    description: 'Steady moderate rainfall',
    icon: 'CloudRain',
    bgGradient: 'from-blue-600 to-indigo-800',
    textColor: 'text-blue-700',
    category: 'rain',
  },
  65: {
    label: 'Heavy Rain',
    description: 'Torrential downpour and heavy rain',
    icon: 'CloudRainWind',
    bgGradient: 'from-blue-700 to-slate-900',
    textColor: 'text-blue-800',
    category: 'rain',
  },
  66: {
    label: 'Light Freezing Rain',
    description: 'Icy light rain freezing on impact',
    icon: 'CloudRain',
    bgGradient: 'from-indigo-500 to-slate-800',
    textColor: 'text-indigo-600',
    category: 'rain',
  },
  67: {
    label: 'Heavy Freezing Rain',
    description: 'Severe freezing rainstorm',
    icon: 'CloudRainWind',
    bgGradient: 'from-indigo-700 to-slate-900',
    textColor: 'text-indigo-800',
    category: 'rain',
  },
  71: {
    label: 'Slight Snow',
    description: 'Light fluttering snow flakes',
    icon: 'Snowflake',
    bgGradient: 'from-sky-300 to-blue-500',
    textColor: 'text-sky-600',
    category: 'snow',
  },
  73: {
    label: 'Moderate Snow',
    description: 'Steady snow accumulation',
    icon: 'Snowflake',
    bgGradient: 'from-blue-300 to-indigo-600',
    textColor: 'text-blue-600',
    category: 'snow',
  },
  75: {
    label: 'Heavy Snow',
    description: 'Heavy snowstorm and blizzard conditions',
    icon: 'Snowflake',
    bgGradient: 'from-slate-400 to-indigo-900',
    textColor: 'text-slate-700',
    category: 'snow',
  },
  77: {
    label: 'Snow Grains',
    description: 'Fine icy snow grains',
    icon: 'Snowflake',
    bgGradient: 'from-sky-200 to-slate-600',
    textColor: 'text-sky-600',
    category: 'snow',
  },
  80: {
    label: 'Light Rain Showers',
    description: 'Passing light rain showers',
    icon: 'CloudSunRain',
    bgGradient: 'from-sky-400 to-indigo-600',
    textColor: 'text-sky-600',
    category: 'rain',
  },
  81: {
    label: 'Moderate Rain Showers',
    description: 'Scattered rain showers',
    icon: 'CloudSunRain',
    bgGradient: 'from-blue-500 to-indigo-700',
    textColor: 'text-blue-600',
    category: 'rain',
  },
  82: {
    label: 'Violent Rain Showers',
    description: 'Intense rain burst and sudden downpour',
    icon: 'CloudRainWind',
    bgGradient: 'from-indigo-600 to-slate-900',
    textColor: 'text-indigo-700',
    category: 'rain',
  },
  85: {
    label: 'Light Snow Showers',
    description: 'Brief passing snow showers',
    icon: 'Snowflake',
    bgGradient: 'from-sky-300 to-blue-600',
    textColor: 'text-sky-600',
    category: 'snow',
  },
  86: {
    label: 'Heavy Snow Showers',
    description: 'Intense sudden snow squalls',
    icon: 'Snowflake',
    bgGradient: 'from-slate-500 to-indigo-900',
    textColor: 'text-slate-800',
    category: 'snow',
  },
  95: {
    label: 'Thunderstorm',
    description: 'Thunderstorm with lightning and gusty winds',
    icon: 'CloudLightning',
    bgGradient: 'from-amber-600 to-slate-900',
    textColor: 'text-amber-600',
    category: 'thunderstorm',
  },
  96: {
    label: 'Thunderstorm & Hail',
    description: 'Severe thunderstorm with light hail',
    icon: 'CloudHail',
    bgGradient: 'from-purple-700 to-slate-950',
    textColor: 'text-purple-600',
    category: 'thunderstorm',
  },
  99: {
    label: 'Severe Hail Thunderstorm',
    description: 'Intense thunderstorm with heavy hail',
    icon: 'CloudHail',
    bgGradient: 'from-purple-900 to-slate-950',
    textColor: 'text-purple-700',
    category: 'thunderstorm',
  },
};

export function getWeatherDetails(code: number): WeatherCodeDetails {
  return (
    WMO_WEATHER_CODES[code] || {
      label: 'Unknown Weather',
      description: 'Variable weather conditions',
      icon: 'Cloud',
      bgGradient: 'from-slate-400 to-slate-600',
      textColor: 'text-slate-500',
      category: 'cloudy',
    }
  );
}

/**
 * Temperature conversion and formatting
 */
export function formatTemp(celsius: number, unit: TemperatureUnit = 'C'): string {
  if (isNaN(celsius)) return '--';
  if (unit === 'F') {
    const fahrenheit = Math.round((celsius * 9) / 5 + 32);
    return `${fahrenheit}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

/**
 * Converts Celsius number value to target unit number
 */
export function convertTemp(celsius: number, unit: TemperatureUnit = 'C'): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

/**
 * Formats local time for a given ISO time string or location timezone
 */
export function formatLocalTime(timeStr?: string, timezone?: string): string {
  try {
    const date = timeStr ? new Date(timeStr) : new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

/**
 * Formats date to readable string (e.g. "Jul 24, 2026")
 */
export function formatDateLabel(isoDate: string): string {
  try {
    const date = new Date(isoDate + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    }).format(date);
  } catch {
    return isoDate;
  }
}

/**
 * Returns Day Label ("Today", "Tomorrow", "Mon", "Tue", etc.)
 */
export function getDayLabel(isoDate: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  try {
    const date = new Date(isoDate + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  } catch {
    return `Day ${index + 1}`;
  }
}

/**
 * Generates intelligent planning recommendations based on current and 7-day forecast data
 */
export function generatePlanningRecommendations(
  data: WeatherData
): PlanningRecommendation[] {
  const recs: PlanningRecommendation[] = [];
  const current = data.current_weather;
  const daily = data.daily;

  const currentTemp = current.temperature;
  const maxTempToday = daily?.temperature_2m_max?.[0] ?? currentTemp;
  const minTempToday = daily?.temperature_2m_min?.[0] ?? currentTemp;
  const maxTempWeek = daily?.temperature_2m_max
    ? Math.max(...daily.temperature_2m_max)
    : currentTemp;
  const minTempWeek = daily?.temperature_2m_min
    ? Math.min(...daily.temperature_2m_min)
    : currentTemp;

  // Check for Rain in 7-day outlook or current
  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  const isRainyToday = rainCodes.includes(current.weathercode) || rainCodes.includes(daily?.weathercode?.[0] ?? -1);
  const rainDaysAhead = daily?.weathercode?.filter((code) => rainCodes.includes(code)).length ?? 0;

  // 1. Umbrella / Rain Advisory
  if (isRainyToday) {
    recs.push({
      id: 'rain-today',
      title: 'Carry an umbrella today',
      description: 'Rain or drizzle is expected today. Keep a waterproof jacket or umbrella handy.',
      category: 'rain',
      priority: 'high',
      icon: 'Umbrella',
    });
  } else if (rainDaysAhead > 0) {
    recs.push({
      id: 'rain-week',
      title: 'Rain predicted later this week',
      description: `Rain is expected on ${rainDaysAhead} day(s) during the week. Plan indoor alternatives when needed.`,
      category: 'rain',
      priority: 'medium',
      icon: 'CloudRain',
    });
  }

  // 2. Extreme Heat / Hydration Advisory
  if (maxTempToday >= 35 || currentTemp >= 35) {
    recs.push({
      id: 'heat-alert',
      title: 'Stay hydrated — High Heat (>35°C)',
      description: 'Temperatures exceed 35°C. Drink plenty of water, wear light clothing, and avoid direct sun during peak hours.',
      category: 'heat',
      priority: 'high',
      icon: 'Flame',
    });
  } else if (maxTempWeek >= 32) {
    recs.push({
      id: 'warm-week',
      title: 'Warm weather ahead',
      description: `Peak temperatures will reach ${Math.round(maxTempWeek)}°C this week. Hydration and sun screen recommended.`,
      category: 'heat',
      priority: 'medium',
      icon: 'Sun',
    });
  }

  // 3. Cold Weather Advisory
  if (minTempToday <= 5 || currentTemp <= 10) {
    recs.push({
      id: 'cold-alert',
      title: 'Expect cold weather',
      description: 'Chilly temperatures expected. Layer up with a warm coat, scarf, and thermal wear when heading outdoors.',
      category: 'cold',
      priority: 'high',
      icon: 'ThermometerSnowflake',
    });
  } else if (minTempWeek <= 8) {
    recs.push({
      id: 'cold-week',
      title: 'Cool mornings ahead',
      description: `Low temperatures will dip to ${Math.round(minTempWeek)}°C. Carry a light jacket for morning or evening travel.`,
      category: 'cold',
      priority: 'medium',
      icon: 'Shirt',
    });
  }

  // 4. Outdoor Activities Recommendation
  const isPleasantToday =
    !isRainyToday &&
    currentTemp >= 16 &&
    currentTemp <= 28 &&
    current.windspeed < 25;

  if (isPleasantToday) {
    recs.push({
      id: 'outdoor-ideal',
      title: 'Good day for outdoor activities',
      description: 'Mild temperatures, calm winds, and clear conditions make today ideal for walking, cycling, or outdoor sports.',
      category: 'outdoor',
      priority: 'positive',
      icon: 'Sparkles',
    });
  }

  // 5. High Wind Advisory
  if (current.windspeed >= 25) {
    recs.push({
      id: 'wind-alert',
      title: 'Breezy & windy conditions',
      description: `Winds reaching ${Math.round(current.windspeed)} km/h. Secure loose outdoor furniture and be cautious while cycling.`,
      category: 'wind',
      priority: 'medium',
      icon: 'Wind',
    });
  }

  // 6. Default fallback if conditions are standard
  if (recs.length === 0) {
    recs.push({
      id: 'general-stable',
      title: 'Fair & manageable weather',
      description: 'No severe weather alerts today. Enjoy your day with standard seasonal clothing.',
      category: 'general',
      priority: 'info',
      icon: 'Compass',
    });
  }

  return recs;
}

/**
 * Evaluates activity ratings based on weather metrics
 */
export function getActivityRatings(data: WeatherData): ActivityRating[] {
  const current = data.current_weather;
  const temp = current.temperature;
  const wind = current.windspeed;
  const code = current.weathercode;

  const isRain = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
  const isClear = [0, 1].includes(code);

  // Running
  let runningStatus: ActivityRating['status'] = 'Good';
  let runningScore = 4;
  let runningReason = 'Comfortable running conditions';

  if (isRain || temp > 32 || temp < 2) {
    runningStatus = 'Unfavorable';
    runningScore = 1;
    runningReason = isRain ? 'Rain present' : temp > 32 ? 'Extreme heat' : 'Freezing cold';
  } else if (temp >= 12 && temp <= 22 && wind < 20) {
    runningStatus = 'Ideal';
    runningScore = 5;
    runningReason = 'Optimal temperature & low wind';
  } else if (wind >= 25) {
    runningStatus = 'Moderate';
    runningScore = 3;
    runningReason = 'Strong headwind expected';
  }

  // Outdoor Dining
  let diningStatus: ActivityRating['status'] = 'Good';
  let diningScore = 4;
  let diningReason = 'Pleasant patio weather';

  if (isRain || temp < 15 || temp > 34 || wind > 25) {
    diningStatus = 'Unfavorable';
    diningScore = 1;
    diningReason = isRain ? 'Rain expected' : wind > 25 ? 'High wind' : 'Uncomfortable temperatures';
  } else if (isClear && temp >= 18 && temp <= 27 && wind < 15) {
    diningStatus = 'Ideal';
    diningScore = 5;
    diningReason = 'Sunny, calm and warm';
  }

  // Cycling
  let cyclingStatus: ActivityRating['status'] = 'Good';
  let cyclingScore = 4;
  let cyclingReason = 'Good road visibility';

  if (isRain || wind > 30 || temp < 5) {
    cyclingStatus = 'Unfavorable';
    cyclingScore = 1;
    cyclingReason = wind > 30 ? 'Gale force winds' : isRain ? 'Wet slippery roads' : 'Cold conditions';
  } else if (!isRain && wind < 18 && temp >= 14 && temp <= 26) {
    cyclingStatus = 'Ideal';
    cyclingScore = 5;
    cyclingReason = 'Dry roads and low drag';
  }

  // Stargazing
  let starStatus: ActivityRating['status'] = 'Moderate';
  let starScore = 3;
  let starReason = 'Some cloud cover present';

  if (isClear && !isRain) {
    starStatus = 'Ideal';
    starScore = 5;
    starReason = 'Clear cloudless night sky';
  } else if ([2, 3, 45, 48].includes(code)) {
    starStatus = 'Moderate';
    starScore = 2;
    starReason = 'Overcast clouds obstructing visibility';
  } else if (isRain) {
    starStatus = 'Unfavorable';
    starScore = 1;
    starReason = 'Rain precipitation';
  }

  return [
    { name: 'Running / Jogging', status: runningStatus, score: runningScore, icon: 'Footprints', reason: runningReason },
    { name: 'Outdoor Dining', status: diningStatus, score: diningScore, icon: 'Utensils', reason: diningReason },
    { name: 'Cycling', status: cyclingStatus, score: cyclingScore, icon: 'Bike', reason: cyclingReason },
    { name: 'Stargazing', status: starStatus, score: starScore, icon: 'Moon', reason: starReason },
  ];
}
