// import React, {useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity, ScrollView} from 'react-native';
import Forecasts from "@/components/Forecasts";
import getStyles from '@/assets/styles/styles';
import {AntDesign} from '@expo/vector-icons';
import {LocationForecast} from "@/constants/types"
import {useRouter} from 'expo-router';

type Props = {
    weatherList: LocationForecast[];
    removeForecast: (forecast_locale: string) => void;
};

const ForecastScroller: React.FC<Props> = ({weatherList, removeForecast}) => {
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)
    const router = useRouter();
    const antClose = colorScheme === 'dark' ? "closecircleo" : "closecircleo"
    const antColor = colorScheme === 'dark' ? "white" : "black"
    return (
        <ScrollView
            style={{marginTop: 2}}
        >
            {weatherList.map((item, index) => (
                <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => removeForecast(item.forecast_locale)}
                                          accessibilityLabel="Remove forecast">
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
                        style={styles.floatingButton}
                        onPress={() => router.push({
                            pathname: '/full-forecast',
                            params: {
                                lat: item.lat.toString(),
                                long: item.long.toString(),
                                forecast_locale: item.forecast_locale.toString()
                            }
                        },)}
                    >
                        <Text style={styles.buttonText}>Full Forecast</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default ForecastScroller;
