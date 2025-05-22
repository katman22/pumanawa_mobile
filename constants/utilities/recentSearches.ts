import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationData } from '@/constants/types';

const STORAGE_KEY = 'RECENT_SEARCHES';
const MAX_ENTRIES = 8;

export const saveRecentSearch = async (search: LocationData) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    let recent: LocationData[] = existing ? JSON.parse(existing) : [];

    const existingMatch = recent.find(
        item => item.lat === search.lat && item.lng === search.lng && item.name === search.name
    );

    const updatedSearch = {
      ...search,
      favorite: existingMatch?.favorite ?? false
    };

    recent = recent.filter(
        item => !(item.lat === search.lat && item.lng === search.lng && item.name === search.name)
    );
    recent.unshift(updatedSearch);
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

export const removeRecentSearch = async (target: LocationData) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const recent: LocationData[] = JSON.parse(stored);
    const updated = recent.filter(
        item => !(item.lat === target.lat && item.lng === target.lng && item.name === target.name)
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing recent search:', err);
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing recent searches:', err);
  }
};
