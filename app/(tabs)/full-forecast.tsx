import {View, Text, useColorScheme, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchHourlyWeather} from "@/hooks/UseWeatherService";
import {useLocalSearchParams} from 'expo-router';
import {LocationData, LocationHourlyForecast} from "@/constants/types";
import React, {useState, useEffect, useContext} from "react";
import Footer from "@/components/Footer";
import HourlyForecastGrid from "@/components/HourlyForecastGrid";
import {LatLongContext} from "@/components/LatLongContext";
import Header from "@/components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import ZoomWrapper from "@/components/ZoomWrapper";
import {useTheme} from '@react-navigation/native';
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function FullForecastScreen() {
    const {lat, long, forecast_locale} = useLocalSearchParams() as {
        lat?: string;
        long?: string;
        forecast_locale: string;
    };
    const {lat: contextLat, long: contextLong, setLatLong} = useContext(LatLongContext);
    const [weatherList, setWeatherList] = useState<LocationHourlyForecast | null>(null);
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const [loading, setLoading] = useState(false);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const mainForecast = weatherList?.periods?.[0];
    const remainingForecasts = weatherList?.periods?.slice(1);

    const formatTimestamp = (date: Date) => {
        return `${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
    };

    useEffect(() => {
        if (lat && long) {
            const newLat = Number(lat);
            const newLong = Number(long);
            if (!isNaN(newLat) && !isNaN(newLong)) {
                const isLatChanged = newLat !== contextLat;
                const isLongChanged = newLong !== contextLong;

                if (isLatChanged || isLongChanged) {
                    setLatLong({lat: newLat, long: newLong, forecast_locale: forecast_locale});
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
                    setLastRefreshed(new Date());
                })
                .catch((error) => console.error('Error fetching weather:', error))
                .finally(() => setLoading(false));
        }
    }, [lat, long, forecast_locale]);
    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.topLoading}/>;
    }

    const handleRefresh = async () => {
        if (lat && long && forecast_locale) {
            setLoading(true);
            const location: LocationData = {
                lat,
                lng: long,
                name: forecast_locale,
            };

            try {
                const data = await fetchHourlyWeather(location);
                setWeatherList(data);
                setLastRefreshed(new Date());
            } catch (error) {
                console.error('Error refreshing weather:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    if (!weatherList || !weatherList.periods) {
        return <Text>No forecast data available.</Text>;
    }
    return (
        <ZoomWrapper>
            <View style={(styles.parentContainer)}>
                <View style={styles.container}>
                    <View style={styles.fullForecastContainer}>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginRight: 12,
                                marginLeft: 4,
                                position: 'relative',
                            }}>

                            <View style={{maxWidth: 220, marginLeft: -5}}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: colors.primary,
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {forecast_locale}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between', // or 'space-between' / 'center' depending on layout needs
                                    gap: 8, // optional: if using React Native 0.71+ or with Expo SDK 49+
                                }}
                            >
                                <TouchableOpacity onPress={handleRefresh} style={{marginRight: 0, marginLeft: 10, marginTop: -7}}>
                                    <Ionicons
                                        name="refresh-circle-outline"
                                        size={24}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                                <View style={{marginRight: -10, marginLeft: 10, marginTop: 2}}>
                                    <ThemeToggleButton/>
                                </View>
                                <Header/>
                            </View>

                        </View>

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
                            {lastRefreshed && (
                                <Text style={[styles.lastRefreshedText]}>
                                    Last refreshed: {formatTimestamp(lastRefreshed)}
                                </Text>
                            )}
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

                <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                    <Footer/>
                </View>
            </View>
        </ZoomWrapper>
    )
};


