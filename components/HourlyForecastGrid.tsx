import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {ForecastPeriod} from "@/constants/types";
import React, {useState} from "react";
import getStyles from '@/assets/styles/styles';
import {useTheme} from "@react-navigation/native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { getHumidityLabel, getDewPointLabel} from "@/constants/utilities/recentSearches";

interface HourlyForecastGridProps {
    periods: ForecastPeriod[];
}

export default function HourlyForecastGrid({periods}: HourlyForecastGridProps) {
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
    ;

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

                            renderItem={({item}) => {
                                const iconUrl = item.icon.replace(/\?.*$/, '');
                                return (
                                    <View>
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
                                                <Image
                                                    source={{uri: iconUrl}}
                                                    style={{width: 50, height: 50}}
                                                    accessibilityLabel={item.shortForecast}
                                                    resizeMode="contain"
                                                />
                                            </View>

                                            <View style={styles.tempColumn}>
                                                <Text
                                                    style={styles.temp}>{item.temperature}°{item.temperatureUnit}</Text>
                                            </View>

                                            <View style={styles.tempColumn}>
                                                <Text style={styles.precipMain}>
                                                    <SimpleLineIcons name="drop" size={10} color={colors.primary}/>
                                                    {item.probabilityOfPrecipitation.value}%
                                                </Text>
                                            </View>

                                            <View style={styles.windColumn}>
                                                <Text style={styles.wind}>{item.windDirection} {item.windSpeed}</Text>
                                            </View>
                                            <View style={styles.showColumn}>
                                                <TouchableOpacity
                                                    style={styles.showColumn}
                                                    onPress={() => {
                                                        setOpenRowIndex(openRowIndex === index ? null : index);
                                                    }}>
                                                    <SimpleLineIcons
                                                        name={openRowIndex === index ? 'minus' : 'plus'}
                                                        size={20}
                                                        color={colors.primary}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {openRowIndex === index && (
                                            <View style={styles.detailsContainer}>
                                                <Text style={styles.shortName}>Short Forecast</Text>
                                                <Text style={styles.detailedForecast}>{item.shortForecast}</Text>

                                                <Text style={styles.detailedForecast}>
                                                    Dew Point: {item.dewpoint.value?.toFixed(1)}°C
                                                    {" "}({getDewPointLabel(item.dewpoint.value)})
                                                </Text>

                                                <Text style={styles.detailedForecast}>
                                                    Humidity: {item.relativeHumidity.value}%
                                                    {" "}({getHumidityLabel(item.relativeHumidity.value)})
                                                </Text>
                                            </View>

                                        )}
                                    </View>
                                );
                            }}

                        />
                    </View>
                )}
            />
        </View>


    );
}
