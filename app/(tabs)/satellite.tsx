import {useLocalSearchParams} from 'expo-router';
import {WebView} from 'react-native-webview';
import {fetchRadar} from "@/hooks/UseWeatherService";
import React, {useEffect, useState} from "react";
import {LatLong} from "@/components/LatLongContext";
import {ActivityIndicator, Text, useColorScheme, View} from "react-native";
import getStyles from '@/assets/styles/styles';
import {RadarLocation} from "@/constants/types";
import Footer from "@/components/Footer";

export default function SatelliteScreen() {
    const {lat, long, forecast_locale} = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme() || "light";
    const styles = getStyles(colorScheme);
    const [radar, setRadar] = useState<string | null>(null);

    useEffect(() => {
        if (lat && long) {
            setLoading(true);
            const latLong: LatLong = {
                lat: Number(lat),
                long: Number(long),
                forecast_locale: String(forecast_locale)
            };
            fetchRadar(latLong)
                .then((data: RadarLocation) => {
                    setRadar(data.radar?.radar);
                })
                .catch((error) => console.error("Error fetching radar:", error))
                .finally(() => setLoading(false));
        }
    }, [lat, long]);
    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.topLoading}/>;
    }

    if (!radar) {
        return null; // or a fallback UI
    }
    return (
            <View style={styles.container}>
                <Text style={styles.radarHeading}>Radar for: {forecast_locale}</Text>
                <WebView
                    source={{uri: `https://radar.weather.gov/station/${radar}`}}
                    style={{marginTop: 10}}
                />
                <View style={{marginBottom: -30, marginRight: -20}}>
                <Footer/>
                </View>
            </View>

    )
}
