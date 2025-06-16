import {View, Text, ActivityIndicator} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchHourlyWeather} from "@/hooks/UseWeatherService";
import {useLocalSearchParams} from 'expo-router';
import {LocationData, LocationHourlyForecast} from "@/constants/types";
import React, {useState, useEffect, useContext} from "react";
import Footer from "@/components/Footer";
import HourlyForecastGrid from "@/components/HourlyForecastGrid";
import MainForecastCard from "@/components/MainForecastCard"
import {LatLongContext} from "@/components/LatLongContext";
import ZoomWrapper from "@/components/ZoomWrapper";
import {useTheme} from '@react-navigation/native';

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
                    <MainForecastCard
                        forecast_locale={forecast_locale}
                        mainForecast={mainForecast}
                        lastRefreshed={lastRefreshed}
                        onRefresh={handleRefresh}
                        formatTimestamp={formatTimestamp}
                        maxCardHeight={390}
                    />

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


