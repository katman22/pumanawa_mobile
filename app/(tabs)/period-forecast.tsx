import {View, Text, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchPeriodForecast} from "@/hooks/UseWeatherService";
import {useLocalSearchParams, useRouter} from 'expo-router';
import {LocationData, ForecastPeriod} from "@/constants/types";
import React, {useState, useEffect} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import ZoomWrapper from "@/components/ZoomWrapper";
import {useTheme} from '@react-navigation/native';
import ThemeToggleButton from "@/components/ThemeToggleButton";
import {getDewPointLabel, getHumidityLabel} from "@/constants/utilities/recentSearches";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PeriodForecastScreen() {
    const {lat, long, forecast_locale, period} = useLocalSearchParams() as {
        lat?: string;
        long?: string;
        forecast_locale: string;
        period: string;
    };
    const router = useRouter();
    const [forecast, setForecast] = useState<ForecastPeriod | null>(null);
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const [loading, setLoading] = useState(false);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const formatTimestamp = (date: Date) => {
        return `${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
    };

    useEffect(() => {
        if (!lat || !long || !forecast_locale || !period) return;

        const location: LocationData = {
            lat: String(lat),
            lng: String(long),
            name: forecast_locale,
        };

        setLoading(true);

        fetchPeriodForecast(location, period)
            .then((data) => {
                setForecast(data);
                setLastRefreshed(new Date());
            })
            .catch((error) => console.error('Error fetching weather:', error))
            .finally(() => setLoading(false));
    }, [lat, long, forecast_locale, period]);

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
                const data = await fetchPeriodForecast(location, period);
                setForecast(data);
                setLastRefreshed(new Date());
            } catch (error) {
                console.error('Error refreshing weather:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    if (!forecast) {
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
                                <TouchableOpacity onPress={handleRefresh}
                                                  style={{marginRight: 0, marginLeft: 10, marginTop: -7}}>
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
                                <Text style={styles.periodName}>{forecast?.name}</Text>
                                <Text style={styles.shortForecast}>{forecast?.shortForecast}</Text>
                                <Text style={styles.wind}>
                                    Wind: {forecast?.windDirection} {forecast?.windSpeed}
                                </Text>
                                <Text style={styles.temp}>
                                    Temp: {forecast?.temperature}°{forecast?.temperatureUnit}
                                </Text>
                            </View>
                            {/* Right side: Forecast Image */}
                            <Image
                                source={{uri: forecast?.icon}}
                                style={styles.weatherIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailsName}>Full Details:</Text>
                            <Text style={styles.detailedForecast}>
                                {forecast?.detailedForecast}</Text>
                            <Text style={styles.detailedForecast}>
                                Dew Point: {forecast.dewpoint.value?.toFixed(1)}°C
                                {" "}({getDewPointLabel(forecast.dewpoint.value)})
                            </Text>

                            <Text style={styles.detailedForecast}>
                                Humidity: {forecast.relativeHumidity.value}%
                                {" "}({getHumidityLabel(forecast.relativeHumidity.value)})
                            </Text>
                            {lastRefreshed && (
                                <Text style={[styles.lastRefreshedText]}>
                                    Last refreshed: {formatTimestamp(lastRefreshed)}
                                </Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push({
                        pathname: '/'
                    },)}>
                        <View style={{marginLeft: 40, marginTop: 20}}>
                            <MaterialCommunityIcons name="weather-sunny" size={30} color="black"/>
                            <Text style={{marginLeft: -8}}>Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{position: 'absolute', bottom: 60, width: '100%'}}>
                    <Footer/>
                </View>
            </View>
        </ZoomWrapper>
    )
};


