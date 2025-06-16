import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {fetchDiscussion, fetchHourlyWeather} from "@/hooks/UseWeatherService";
import Footer from "@/components/Footer";
import ZoomWrapper from "@/components/ZoomWrapper";
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from "react";
import {useLocalSearchParams} from 'expo-router';
import {DiscussionData, LocationData} from "@/constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Header from "@/components/Header";
import HourlyForecastGrid from "@/components/HourlyForecastGrid";
import InlineAd from "@/components/InlineAd";

export default function DiscussionScreen() {
    const {lat, long, forecast_locale} = useLocalSearchParams() as {
        lat?: string;
        long?: string;
        forecast_locale?: string;
    };

    const {colors} = useTheme();
    const styles = getStyles(colors);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [discussion, setDiscussionText] = useState<DiscussionData | null>(null);

    useEffect(() => {
        if (lat && long) {
            fetchDiscussion(lat, long)
                .then((data) => {
                    if (data?.discussion) {
                        setDiscussionText(data.discussion);
                    }
                })
                .catch((err) => {
                    console.error("Failed to load forecast discussion", err);
                })
                .finally(() => setLoading(false));
        }
    }, [lat, long]);

    const handleRefresh = async () => {
        if (lat && long) {
            setRefreshing(true);
            try {
                const data = await fetchDiscussion(lat, long);
                if (data?.discussion) {
                    setDiscussionText(data.discussion);
                }
            } catch (err) {
                console.error("Failed to refresh forecast discussion", err);
            } finally {
                setRefreshing(false);
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.topLoading}/>;
    }

    function formatForecastText(text: string) {
        const normalized = text
            .replace(/\n(?!\n)/g, ' ')  // Replace single \n with space
            .replace(/\n\n+/g, '\n\n'); // Collapse multiple newlines to exactly two

        return normalized
            .split('\n\n')
            .map((para, i) => (
                <Text key={i} style={{marginBottom: 8, lineHeight: 22}}>
                    {para.trim()}
                </Text>
            ));
    }

    return (
        <ZoomWrapper>
            <View style={[styles.fullForecastContainer, {
                maxHeight: 330,
                marginTop: 45,
                marginRight: 20,
                marginLeft: 20
            }]}>
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
                                marginTop: 10,
                                marginLeft: 5,
                                paddingBottom: 10
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {forecast_locale}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                        }}
                    >
                        {refreshing ? (
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                                style={{marginRight: -8, marginLeft: 15, marginTop: -7}}
                            />
                        ) : (<TouchableOpacity
                            onPress={handleRefresh}
                            style={{marginRight: -12, marginLeft: 15, marginTop: -7}}
                        >
                            <Ionicons
                                name="refresh-circle-outline"
                                size={24}
                                color={colors.primary}
                            />
                        </TouchableOpacity>)}

                        <View style={{marginRight: -10, marginLeft: 10, marginTop: 2}}>
                            <ThemeToggleButton/>
                        </View>
                        <Header/>
                    </View>
                </View>
                {refreshing ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                ) : (
                    <ScrollView
                        style={{ flexGrow: 0 }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.shortContainer}>
                            <Text style={styles.detailsName}>Short Term:</Text>
                            <Text style={styles.detailedForecast}>
                                {formatForecastText(discussion?.short_term as string)}
                            </Text>
                        </View>
                    </ScrollView>
                )}
            </View>
            <InlineAd/>
            <View style={[styles.fullForecastContainer, {
                maxHeight: 400,
                marginTop: 0,
                marginRight: 20,
                marginLeft: 20,
                marginBottom: 520
            }]}>
                {refreshing ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                ) : (
                    <ScrollView
                        style={{flexGrow: 0}}
                        contentContainerStyle={{paddingBottom: 20}}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.detailsContainer}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={styles.detailsName}>Long Term:</Text>
                            </View>
                            <Text style={styles.detailedForecast}>
                                {formatForecastText(discussion?.long_range as string)}
                            </Text>
                        </View>
                    </ScrollView>
                )}
            </View>
            <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <Footer/>
            </View>
        </ZoomWrapper>
    );
}
