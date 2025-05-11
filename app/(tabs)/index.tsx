// app/(tabs)/index.tsx
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, useColorScheme, ActivityIndicator} from 'react-native';
import {fetchWeather, fetchLocations} from "@/hooks/UseWeatherService";
import getStyles from '@/assets/styles/styles';
import ForecastScroller from '@/components/ForecastScroller';
import LocationsList from "@/components/LocationsList";
import WeatherInput from "@/components/WeatherInput";
import {AntDesign} from '@expo/vector-icons';
import Footer from "@/components/Footer";
import { LocationData, LocationForecast} from "@/constants/types"

export default function HomeScreen() {
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)
    const [location, setLocation] = useState('');
    const [locationsFound, setLocationResponse] = useState<LocationData []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [weatherList, setWeatherList] = useState<LocationForecast[]>([]);
    const removeForecast = (forecast_to_remove: string) => {
        setWeatherList((prev) => prev.filter(f => f.forecast_locale != forecast_to_remove));
    }
    const [isCollapsed, setIsCollapsed] = useState(false);

    const locationWeather = (location: LocationData) => async () => {
        try {
            setLoading(true);
            const { forecast_locale, forecasts } = await fetchWeather(location);
            setLocationResponse((prev) => prev.filter((loc) => loc.lat !== location.lat || loc.lng !== location.lng));
            setWeatherList((prev) => [...prev, { forecast_locale, forecasts }]);
            setError(null);
        } catch (err) {
            setError('Error fetching location');
        } finally {
            setLoading(false);
        }
    };

    const handleFetchLocations = async () => {
        try {
            setLoading(true);
            const results = await fetchLocations(location);
            setLocationResponse(results);
            setError(null);
        } catch (err) {
            setError('Error fetching location');
            setLocationResponse([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={(styles.parentContainer)}>
            <View style={styles.container}>

                <WeatherInput setLocation={setLocation} fetchLocations={handleFetchLocations} loading={loading}
                              location={location}/>

                {error &&
                    <Text style={styles.error}>{error}</Text>
                }
                {locationsFound.length > 0 && (
                    <View style={styles.collapsibleContainer}>
                        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}
                                          style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>
                                {isCollapsed ? <AntDesign name="downcircleo"/> : <AntDesign name="upcircleo"/>}
                            </Text>
                            <Text style={styles.collapsibleText}> Locations</Text>
                        </TouchableOpacity>
                        {!isCollapsed && (
                            <View style={{position: 'relative'}}>
                                <LocationsList locationsFound={locationsFound} locationWeather={locationWeather}/>
                                {loading && (
                                    <View style={styles.collapsibleMask}>
                                        <ActivityIndicator size="small" color="#000"/>
                                    </View>
                                )}
                            </View>

                        )}
                    </View>
                )}

                {weatherList.length > 0 && (
                    <ForecastScroller weatherList={weatherList} removeForecast={removeForecast}/>
                )}

            </View>
            <Footer />
        </View>
    );
}
