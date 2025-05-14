import {View, Text, useColorScheme, ActivityIndicator, Image} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchHourlyWeather} from "@/hooks/UseWeatherService";
import {useLocalSearchParams} from 'expo-router';
import {LocationData, LocationHourlyForecast} from "@/constants/types";
import React, {useState, useEffect, useContext} from "react";
import {saveRecentSearch} from '@/constants/utilities/recentSearches';
import Footer from "@/components/Footer";
import HourlyForecastGrid from "@/components/HourlyForecastGrid";
import {LatLongContext} from "@/components/LatLongContext";

export default function FullForecastScreen() {
    const { lat, long, forecast_locale } = useLocalSearchParams() as {
        lat?: string;
        long?: string;
        forecast_locale: string;
    };
    const { lat: contextLat, long: contextLong, setLatLong } = useContext(LatLongContext);
    const [weatherList, setWeatherList] = useState<LocationHourlyForecast | null>(null);
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)
    const [loading, setLoading] = useState(false);
    const mainForecast = weatherList?.periods?.[0];
    const remainingForecasts = weatherList?.periods?.slice(1);

    useEffect(() => {
        if (lat && long) {
            const newLat = Number(lat);
            const newLong = Number(long);
            if (!isNaN(newLat) && !isNaN(newLong)) {
                const isLatChanged = newLat !== contextLat;
                const isLongChanged = newLong !== contextLong;

                if (isLatChanged || isLongChanged) {
                    setLatLong({ lat: newLat, long: newLong, forecast_locale: forecast_locale });
                }
            }
        }
    }, [lat, long, contextLat, contextLong, setLatLong]);

    useEffect(() => {
        if (lat && long && forecast_locale) {
            setLoading(true)
            const location: LocationData = {
                lat,
                lng: long,
                name: forecast_locale,
            };

            fetchHourlyWeather(location)
                .then((data) => {
                    setWeatherList(data);
                    void saveRecentSearch(location);
                })
                .catch((error) => console.error('Error fetching weather:', error))
                .finally(() => setLoading(false));
        }
    }, [lat, long, forecast_locale]);
    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.topLoading}/>;
    }


    if (!weatherList || !weatherList.periods) {
        return <Text>No forecast data available.</Text>;
    }
    return (
        <View style={(styles.parentContainer)}>
            <View style={styles.container}>
                <View style={styles.fullForecastContainer}>
                    <Text style={styles.fullForecastHeading}>{forecast_locale}</Text>
                    <View style={styles.mainForecastRow}>
                        {/* Left side: Forecast details */}
                        <View style={styles.forecastDetails}>
                            <Text style={styles.periodName}>{mainForecast?.name}</Text>
                            <Text style={styles.shortForecast}>{mainForecast?.shortForecast}</Text>
                            <Text style={styles.wind}>
                                Wind: {mainForecast?.windDirection} {mainForecast?.windSpeed}
                            </Text>
                            <Text style={styles.temp}>
                                Temp: {mainForecast?.temperature}°{mainForecast?.temperatureUnit}
                            </Text>
                        </View>
                        {/* Right side: Forecast Image */}
                        <Image
                            source={{uri: mainForecast?.icon}}
                            style={styles.weatherIcon}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsName}>Full Details:</Text>
                        <Text style={styles.detailedForecast}>
                            {mainForecast?.detailedForecast}</Text>
                    </View>
                </View>

                <View style={styles.hourlyForecastContainer}>
                    {remainingForecasts && remainingForecasts.length > 0 && (
                        <View>
                            <Text style={styles.hourlyName}>Hourly Forecast</Text>
                            <HourlyForecastGrid periods={remainingForecasts}/>
                        </View>
                    )}
                </View>
            </View>
            <Footer/>
        </View>
    )
};


