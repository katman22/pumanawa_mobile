// import React, {useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity, ScrollView} from 'react-native';
import Forecasts from "@/components/Forecasts";
import getStyles from '@/assets/styles/styles';
import {AntDesign} from '@expo/vector-icons';
import { ForecastItem} from "@/constants/types"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Props = {
    weatherList: {
        forecast_locale: string;
        forecasts: ForecastItem[];
    }[];
    removeForecast: (forecast_locale: string) => void;
};

const ForecastScroller: React.FC<Props> = ({weatherList, removeForecast}) => {
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)

    const antClose = colorScheme == 'dark' ? "closecircleo":"closecircleo"
    const antColor = colorScheme == 'dark' ? "white":"black"
    return (
        <ScrollView
            style={{marginTop: 2}}
        >
            {weatherList.map((item, index) => (
                <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => removeForecast(item.forecast_locale)}
                                          accessibilityLabel="Remove forecast">
                            <AntDesign style={styles.closeAntCircle} name={antClose} color={antColor} />
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
                </View>
            ))}
        </ScrollView>
    );
};

export default ForecastScroller;
