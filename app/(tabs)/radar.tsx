import { useLocalSearchParams } from 'expo-router';
import { fetchRadar } from "@/hooks/UseWeatherService";
import React, { useEffect, useState } from "react";
import {ActivityIndicator, View, StyleSheet, TouchableOpacity} from "react-native";
import getStyles from '@/assets/styles/styles';
import { RadarLocation } from "@/constants/types";
import Footer from "@/components/Footer";
import { useTheme } from '@react-navigation/native';
import MapView, { UrlTile } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Header from "@/components/Header";
import RadarHeader from "@/components/RadarHeader";

export default function RadarScreen() {
    const { lat, long, forecast_locale } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [radar, setRadar] = useState<string | null>(null);
    const refreshRadar = async () => {
        if (lat && long) {
            setLoading(true);
            fetchRadar({
                lat: Number(lat),
                long: Number(long),
                forecast_locale: String(forecast_locale),
            })
                .then((data: RadarLocation) => {
                    setRadar(data.radar?.radar); // Should be something like "KMTX"
                })
                .catch((error) => console.error("Error fetching radar:", error))
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        if (lat && long) {
            setLoading(true);
            fetchRadar({
                lat: Number(lat),
                long: Number(long),
                forecast_locale: String(forecast_locale),
            })
                .then((data: RadarLocation) => {
                    setRadar(data.radar?.radar); // Should be something like "KMTX"
                })
                .catch((error) => console.error("Error fetching radar:", error))
                .finally(() => setLoading(false));
        }
    }, [lat, long]);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.topLoading} />;
    }

    if (!radar || !lat || !long) {
        return null;
    }

    return (
        <View style={styles.parentRadarContainer}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end', // Aligns entire row to the right
                    alignItems: 'center',       // Vertically align items
                    paddingRight: 0,
                    paddingTop: 10,
                    paddingBottom: 10
                }}
            >
                <TouchableOpacity onPress={refreshRadar} style={{ marginBottom: -20 }}>
                    <Ionicons
                        name="refresh-circle-outline"
                        size={24}
                        color={colors.primary}
                    />
                </TouchableOpacity>

                    <View style={{ marginTop: 32, paddingBottom: 0, marginLeft: 15}}>
                    <ThemeToggleButton />
                </View>

                <View style={{ marginBottom: -20, marginLeft: 15 }}>
                    <RadarHeader />
                </View>
            </View>

            <MapView
                style={{ flex: 1, paddingBottom: 10}}
                initialRegion={{
                    latitude: Number(lat),
                    longitude: Number(long),
                    latitudeDelta: 2.0,
                    longitudeDelta: 2.0,
                }}
            >
                <UrlTile
                    urlTemplate={`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/ridge::${radar}/BaseReflectivity/{z}/{x}/{y}.png`}
                    zIndex={1}
                    maximumZ={12}
                    tileSize={256}
                    flipY={false}
                />
            </MapView>
            <View style={{marginBottom: -10}}>
            <Footer />
            </View>
        </View>
    );
}
