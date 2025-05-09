// app/(tabs)/index.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import Forecasts from "@/components/Forecasts";
import {ActivityIndicator} from 'react-native';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

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
        const existing = await SecureStore.getItemAsync('api_token');
        if (!existing) {
            const token = Constants.expoConfig?.extra?.apiToken;
            if (token) {
                await SecureStore.setItemAsync('api_token', token);
                console.log('JWT stored in SecureStore');
            } else {
                console.warn('API token not found in Constants');
            }
        }
    };

    const getApiToken = async () => {
        return await SecureStore.getItemAsync('api_token');
    };

    const locationWeather = (location: LocationData) => async () => {
        try {
            setLoading(true);
            const token = await getApiToken();
            const response = await axios.get('http://192.168.11.60:3000/api/v1/weather/forecasts', {
                params: { lat: location.lat, name: location.name, long: location.lng },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { forecast_locale, forecasts } = response.data;
            setLocationResponse((prev) => prev.filter((loc) => loc.lat !== location.lat || loc.lng !== location.lng));

            setWeatherList((prev) => [
                ...prev,
                { forecast_locale, forecasts },
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
                <View style={[styles.locationListContainer]}>
                    <FlatList
                        data={locationsFound}
                        keyExtractor={(item) => item.lat + '-' + item.lng}
                        renderItem={({item, index}) => (
                            <TouchableOpacity onPress={locationWeather(item)}
                                              style={[
                                                  styles.locationItem,
                                                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                              ]}
                            >
                                <Text style={{fontSize: 16}}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
            {loading && <ActivityIndicator size="large" color="#007AFF" style={{marginVertical: 20}}/>}

            {weatherList.length > 0 && (
                <ScrollView
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {weatherList.map((item, index) => (
                        <View key={index} style={{ marginBottom: 24 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => removeForecast(item.forecast_locale)}>
                                    <Text style={styles.closeButton}>✕</Text>
                                </TouchableOpacity>

                                <Text style={styles.forecastHeading}>{item.forecast_locale}</Text>
                            </View>
                            <Forecasts forecasts={item.forecasts} />
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    forecastHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 0,
    },
    container: {
        flex: 1,
        padding: 20, marginTop: 50
    },
    header: {fontSize: 24, marginBottom: 20},
    subHeading: {fontSize: 14, marginBottom: 10},
    result: {marginTop: 20, fontSize: 18},
    error: {color: 'red', marginTop: 20},
    inputGroup: {
        marginBottom: 16,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 8, // space between input and button
    },
    goButton: {
        alignSelf: 'flex-end', // aligns the button to the right
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
    },

    goButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    goButtonDisabled: {
        backgroundColor: '#ccc',
    },
    goButtonTextDisabled: {
        color: '#666',
    },

    locationListContainer: {
        maxHeight: 200,
        overflow: 'hidden',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    locationItem: {
        padding: 12,
    },

    evenRow: {
        backgroundColor: '#f9f9f9',
    },

    oddRow: {
        backgroundColor: '#e0e0e0',
    },

    locationText: {
        fontSize: 16,
    },
    closeButton: {
        fontSize: 12,
        color: 'gray',
        padding: 4,
    }


});
