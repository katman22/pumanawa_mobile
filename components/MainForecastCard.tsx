import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import getStyles from '@/assets/styles/styles';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import Header from '@/components/Header';

type Props = {
    forecast_locale: string;
    mainForecast: any;
    lastRefreshed: Date | null;
    onRefresh: () => void;
    formatTimestamp: (date: Date) => string;
    maxCardHeight: number;
    renderExtra?: React.ReactNode;
};

export default function MainForecastCard({
                                             forecast_locale,
                                             mainForecast,
                                             lastRefreshed,
                                             onRefresh,
                                             formatTimestamp,
                                             maxCardHeight,
                                             renderExtra
                                         }: Props) {
    const {colors} = useTheme();
    const styles = getStyles(colors);
    return (
        <View style={[styles.fullForecastContainer, {maxHeight: maxCardHeight}]}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginRight: 12,
                    marginLeft: 4,
                    position: 'relative',
                }}>
                { renderExtra ? (
                <View style={{maxWidth: 220, marginLeft: -5}}>
                    {renderExtra}
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: colors.primary,
                            marginTop: -45,
                            marginLeft: 35,
                            paddingBottom: 10
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {forecast_locale}
                    </Text>
                </View> ) :
                    (
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
                    )}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                    }}
                >
                    <TouchableOpacity
                        onPress={onRefresh}
                        style={{marginRight: 0, marginLeft: 10, marginTop: -7}}
                    >
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
                <View style={styles.forecastDetails}>
                    <Text style={styles.periodName}>{mainForecast?.name}</Text>
                    <Text style={styles.shortForecast}>
                        {mainForecast?.shortForecast}
                    </Text>
                    <Text style={styles.wind}>
                        Wind: {mainForecast?.windDirection} {mainForecast?.windSpeed}
                    </Text>
                    <Text style={styles.temp}>
                        Temp: {mainForecast?.temperature}°
                        {mainForecast?.temperatureUnit}
                    </Text>
                </View>

                <Image
                    source={{uri: mainForecast?.icon}}
                    style={styles.weatherIcon}
                    resizeMode="contain"
                />
            </View>
            <ScrollView
                style={{flexGrow: 0}}
                contentContainerStyle={{paddingBottom: 20}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.detailsName}>Full Details:</Text>
                    </View>
                    <Text style={styles.detailedForecast}>
                        {mainForecast?.detailedForecast}
                    </Text>
                    {lastRefreshed && (
                        <Text style={[styles.lastRefreshedText]}>
                            Last refreshed: {formatTimestamp(lastRefreshed)}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
