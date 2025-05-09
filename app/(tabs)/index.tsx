// app/(tabs)/index.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import ForecastScroller from '@/components/ForecastScroller';
import {ActivityIndicator} from 'react-native';
import {useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import LocationsList from "@/components/LocationsList";
import {styles} from '@/assets/styles';

type ForecastItem = {
    name: string;
    icon: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
    detailedForecast: string;
};


interface LocationData {
    name: string;
    lat: string;
    lng: string
}

type LocationForecast = {
    forecast_locale: string;
    forecasts: ForecastItem[];
};

export default function HomeScreen() {
    const [location, setLocation] = useState('');
    const [locationsFound, setLocationResponse] = useState<LocationData []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [weatherList, setWeatherList] = useState<LocationForecast[]>([]);
    const removeForecast = (forecast_to_remove: string) => {
        setWeatherList((prev) => prev.filter(f => f.forecast_locale != forecast_to_remove));
    }

    useEffect(() => {
        storeApiToken();
    }, []);

    const storeApiToken = async () => {
        const existing = await SecureStore.getItemAsync('api_jwt_token');
        if (!existing) {
            const token = Constants.expoConfig?.extra?.apiToken;
            if (token) {
                await SecureStore.setItemAsync('api_jwt_token', token);
                console.log('JWT stored in SecureStore');
            } else {
                console.warn('API token not found in Constants');
            }
        }
    };

    const getApiToken = async () => {
        return await SecureStore.getItemAsync('api_jwt_token');
    };

    const locationWeather = (location: LocationData) => async () => {
        try {
            setLoading(true);
            const token = await getApiToken();
            const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/forecasts', {
                params: {lat: location.lat, name: location.name, long: location.lng},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const {forecast_locale, forecasts} = response.data;
            setLocationResponse((prev) => prev.filter((loc) => loc.lat !== location.lat || loc.lng !== location.lng));

            setWeatherList((prev) => [
                ...prev,
                {forecast_locale, forecasts},
            ]);

            setError(null);
        } catch (err) {
            setError('Error fetching location');
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const token = await getApiToken();
            const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/index', {
                params: {location: location},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLocationResponse(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching location');
            setLocationResponse([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.subHeading}>Find your local weather</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a location"
                value={location}
                onChangeText={setLocation}
            />
            <TouchableOpacity
                style={[styles.goButton, loading && styles.goButtonDisabled]}
                onPress={fetchLocations}
                disabled={loading}
            >
                <Text style={[styles.goButtonText, loading && styles.goButtonTextDisabled]}>
                    {loading ? 'Loading…' : 'Go'}
                </Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}
            {locationsFound.length > 0 && (
                <LocationsList locationsFound={locationsFound} locationWeather={locationWeather}/>
            )}
            {loading && <ActivityIndicator size="large" color="#007AFF" style={{marginVertical: 20}}/>}

            {weatherList.length > 0 && (
                <ForecastScroller weatherList={weatherList} removeForecast={removeForecast}/>
            )}
        </View>
    );
}
