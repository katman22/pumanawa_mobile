import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchPeriodForecast} from "@/hooks/UseWeatherService";
import {useLocalSearchParams, useRouter} from 'expo-router';
import {LocationData, ForecastPeriod} from "@/constants/types";
import React, {useState, useEffect} from "react";
import Footer from "@/components/Footer";
import ZoomWrapper from "@/components/ZoomWrapper";
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MainForecastCard from "@/components/MainForecastCard";
import LargeInlineAd from "@/components/LargeInlineAd";

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
                    <MainForecastCard
                        forecast_locale={forecast_locale}
                        mainForecast={forecast}
                        lastRefreshed={lastRefreshed}
                        onRefresh={handleRefresh}
                        formatTimestamp={formatTimestamp}

                        maxCardHeight={480}
                        renderExtra={
                            <TouchableOpacity onPress={() => router.push('/')}>
                                <View style={{
                                    alignItems: "flex-start",
                                    marginRight: 5,
                                    marginTop: -2,
                                    paddingBottom: 10
                                }}>
                                    <MaterialCommunityIcons name="weather-sunny" size={26} color={colors.primary}/>
                                    <Text style={{fontSize: 10, color: colors.text}}>Home</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{marginBottom: 150}}>
                    <LargeInlineAd/>
                </View>
                <View style={{position: 'absolute', bottom: 60, width: '100%'}}>
                    <Footer/>
                </View>
            </View>
        </ZoomWrapper>
    )
};


