// hooks/useWeatherService.ts
import axios from 'axios';
import Constants from 'expo-constants';
import {LocationData, LocationForecast, LocationHourlyForecast, RadarLocation} from "@/constants/types"
import {LatLong} from "@/components/LatLongContext"

export const fetchLocations = async (location: string): Promise<LocationData[]> => {
  const token =  Constants.expoConfig?.extra?.apiJwtToken ?? "";
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/index', {
    params: { location },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchWeather = async (location: LocationData): Promise<LocationForecast> => {
  const token = Constants.expoConfig?.extra?.apiJwtToken ?? "";
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/forecasts', {
    params: { lat: location.lat, long: location.lng, name: location.name },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchHourlyWeather = async (location: LocationData): Promise<LocationHourlyForecast> => {
  const token = Constants.expoConfig?.extra?.apiJwtToken ?? "";
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/hourly', {
    params: { lat: location.lat, long: location.lng, name: location.name },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchRadar = async (latLong: LatLong): Promise<RadarLocation> => {
  const token = Constants.expoConfig?.extra?.apiJwtToken ?? "";
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/radar', {
    params: { lat: latLong.lat, long: latLong.long },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
