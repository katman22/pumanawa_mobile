import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationData } from '@/constants/types';

const STORAGE_KEY = 'RECENT_SEARCHES';
const MAX_ENTRIES = 8;

export const getHumidityLabel = (humidity: number | null): string => {
  if (humidity === null || humidity === undefined) return '';

  if (humidity < 20) return 'Very Dry';
  if (humidity < 35) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 75) return 'Humid';
  return 'Very Humid';
};

export const getDewPointLabel = (dewpoint: number | null): string => {
  if (dewpoint === null || dewpoint === undefined) return '';
  if (dewpoint < 10) return 'Chilly';
  if (dewpoint < 16) return 'Comfortable';
  if (dewpoint < 20) return 'Sticky';
  return 'Muggy';
};


export const saveRecentSearch = async (search: LocationData) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    let recent: LocationData[] = existing ? JSON.parse(existing) : [];

    // Remove duplicates
    recent = recent.filter(
        item => !(item.lat === search.lat && item.lng === search.lng && item.name === search.name)
    );

    // Add new to front
    recent.unshift(search);

    // Limit entries
    if (recent.length > MAX_ENTRIES) recent = recent.slice(0, MAX_ENTRIES);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  } catch (err) {
    console.error('Error saving recent search:', err);
  }
};

export const getRecentSearches = async (): Promise<LocationData[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error fetching recent searches:', err);
    return [];
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing recent searches:', err);
  }
};
