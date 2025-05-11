// hooks/useWeatherService.ts
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { LocationData, LocationForecast} from "@/constants/types"

export const getApiToken = async (): Promise<string> => {
  if (Platform.OS !== 'web') {
    return await SecureStore.getItemAsync('api_jwt_token') || '';
  } else {
    return Constants.expoConfig?.extra?.apiToken ?? "Baloney";
  }
};

export const fetchLocations = async (location: string): Promise<LocationData[]> => {
  const token = await getApiToken();
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/index', {
    params: { location },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchWeather = async (location: LocationData): Promise<LocationForecast> => {
  const token = await getApiToken();
  const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/forecasts', {
    params: { lat: location.lat, long: location.lng, name: location.name },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
