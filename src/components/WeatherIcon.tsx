import React from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudSunRain,
  CloudLightning,
  CloudHail,
  Umbrella,
  Wind,
  Flame,
  ThermometerSnowflake,
  Shirt,
  Sparkles,
  Compass,
  Footprints,
  Utensils,
  Bike,
  Moon,
  Search,
  MapPin,
  RefreshCw,
  AlertCircle,
  Clock,
  Calendar,
  Droplets,
  Eye,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  X,
  LucideProps,
} from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunDim':
      return <SunDim {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudRainWind':
      return <CloudRainWind {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudSunRain':
      return <CloudSunRain {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'CloudHail':
      return <CloudHail {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Footprints':
      return <Footprints {...props} />;
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Bike':
      return <Bike {...props} />;
    case 'Moon':
      return <Moon {...props} />;
    case 'Search':
      return <Search {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'RefreshCw':
      return <RefreshCw {...props} />;
    case 'AlertCircle':
      return <AlertCircle {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Eye':
      return <Eye {...props} />;
    case 'ArrowUpRight':
      return <ArrowUpRight {...props} />;
    case 'ChevronRight':
      return <ChevronRight {...props} />;
    case 'TrendingUp':
      return <TrendingUp {...props} />;
    case 'X':
      return <X {...props} />;
    default:
      return <Sun {...props} />;
  }
};
