// import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Forecasts from "@/components/Forecasts";
import getStyles from '@/assets/styles/styles';
import {AntDesign} from '@expo/vector-icons';
import {LocationForecast, LocationData} from "@/constants/types"
import {useRouter} from 'expo-router';
import React from "react";
import {useTheme} from "@react-navigation/native";
import { useThemeToggle } from '@/components/ThemedContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'RECENT_SEARCHES';

type Props = {
    weatherList: LocationForecast[];
    removeForecast: (locale: string) => void;
    setRecent: (items: LocationData[]) => void;
    setWeatherList: (items: LocationForecast[]) => void;
};

const ForecastScroller: React.FC<Props> = ({weatherList, removeForecast, setRecent, setWeatherList}) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const router = useRouter();
    const { currentTheme } = useThemeToggle();
    const antClose = currentTheme === 'dark' ? "closecircleo" : "closecircleo"
    const antColor = colors.primary

     const toggleFavorite = async (target: LocationData): Promise<LocationData[]> => {
        try {
            const existing = await AsyncStorage.getItem(STORAGE_KEY);
            let recent: LocationData[] = existing ? JSON.parse(existing) : [];

            recent = recent.map(item =>
                Number(item.lat) === Number(target.lat) &&
                Number(item.lng) === Number(target.lng) &&
                item.name === target.name
                    ? { ...item, favorite: !item.favorite }
                    : item
            );
            console.log("Toggling favorite for:", target);
            console.log("Stored recent items:", JSON.stringify(recent, null, 2));
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
            return recent;
        } catch (err) {
            console.error('Error toggling favorite:', err);
            return [];
        }
    };




    return (
            <ScrollView
                style={{marginTop: 2, marginBottom: 100}}
            >
                {weatherList.map((item, index) => (
                    <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => removeForecast(item.forecast_locale)}
                                              style={{marginLeft: 8}}>
                                <AntDesign style={styles.closeAntCircle} name={antClose} color={antColor}/>
                            </TouchableOpacity>
                            <Text
                                style={styles.forecastHeading}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >

                                {item.forecast_locale.length > 40
                                    ? item.forecast_locale.slice(0, 40) + '...'
                                    : item.forecast_locale}
                            </Text>
                        </View>
                        <View style={styles.forecastContainer}>
                            <Forecasts forecasts={item.forecasts}/>
                        </View>
                        <TouchableOpacity
                            style={styles.smButton}
                            onPress={() => router.push({
                                pathname: '/full-forecast',
                                params: {
                                    lat: item.lat.toString(),
                                    long: item.long.toString(),
                                    forecast_locale: item.forecast_locale.toString()
                                }
                            },)}
                        >
                            <Text style={styles.buttonTextSm}>Full Forecast</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.favButton}
                            onPress={async () => {
                                const updatedHistory = await toggleFavorite({
                                    lat: item.lat,
                                    lng: item.long,
                                    name: item.name, // assuming `forecast_locale` == name
                                    favorite: item.favorite
                                });

                                const updatedList = weatherList.map(entry =>
                                    entry.lat === item.lat && entry.long === item.long
                                        ? { ...entry, favorite: !entry.favorite }
                                        : entry
                                );



                                setWeatherList(updatedList);
                                // Update recent list too
                                setRecent(updatedHistory);
                            }}
                        >

                            <AntDesign name="staro" size={18}
                                       color={item.favorite ? 'gold' : colors.primary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
    );
};

export default ForecastScroller;
