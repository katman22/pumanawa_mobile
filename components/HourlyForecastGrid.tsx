import {View, Text, FlatList, useColorScheme} from 'react-native';
import {ForecastPeriod} from "@/constants/types";
import React from "react";
import getStyles from '@/assets/styles/styles';

interface HourlyForecastGridProps {
    periods: ForecastPeriod[];
}

export default function HourlyForecastGrid({periods}: HourlyForecastGridProps) {
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)
    return (
        <View style={[styles.hourlyContainer]}>
            <FlatList
                data={periods}
                keyExtractor={(item, index) => `${item.startTime}-${index}`}
                renderItem={({item, index}) => (
                    <View>
                        <FlatList
                            data={[item]}  // Each row has one item in the list (i.e., the hourly data)
                            horizontal
                            keyExtractor={(subItem, subIndex) => `${subItem.startTime}-${subIndex}`}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => (
                                <View style={[
                                    styles.forecastRow,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                ]}>
                                    <View style={styles.forecastDayColumn}>
                                        <Text style={styles.time}>
                                            {new Date(item.startTime).toLocaleDateString(undefined, {weekday: 'short'})}{" "}
                                            {new Date(item.startTime).toLocaleTimeString([], {
                                                hour: 'numeric',
                                                hour12: true
                                            })}
                                        </Text>
                                    </View>

                                    <View style={styles.forecastColumn}>
                                        <Text style={styles.forecast}>{item.shortForecast}</Text>
                                    </View>
                                    <View style={styles.tempColumn}>
                                        <Text style={styles.temp}>{item.temperature}°{item.temperatureUnit}</Text>
                                    </View>
                                    <View style={styles.tempColumn}>
                                        <Text style={styles.wind}>{item.probabilityOfPrecipitation.value}%</Text>
                                        <Text style={styles.precipitation}>chance of precip</Text>
                                    </View>
                                    <View style={styles.forecastColumn}>
                                        <Text style={styles.wind}>{item.windDirection} {item.windSpeed}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                )}
            />
        </View>


    );
}
