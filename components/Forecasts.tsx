import React, {useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ForecastItem} from "@/constants/types"
import {router} from "expo-router";

type Props = {
    forecasts: ForecastItem[];
    lat: string;
    long: string;
    forecast_locale: string;
};

const Forecasts: React.FC<Props> = ({forecasts, lat, long, forecast_locale}) => {
    const [allOpen, setAllOpen] = useState(false);

    const toggleAll = () => {
        setAllOpen((prev) => !prev);
    };

    return (
        <FlatList
            horizontal
            data={forecasts}
            keyExtractor={(item, index) => item.name + index}
            contentContainerStyle={styles.container}
            renderItem={({item, index}) => {
                const tempLabel = item.isDaytime ? `High ${item.temperature}` : `Low ${item.temperature}`;
                const tempColor = item.isDaytime ? styles.dayTemp : styles.nightTemp;

                return (
                    <View style={styles.card}>
                        <Text style={styles.periodName}>
                            <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                        </Text>

                        <TouchableOpacity onPress={toggleAll}>
                            <Image
                                source={{uri: item.icon}}
                                style={styles.icon}
                                accessibilityLabel={item.detailedForecast}
                            />
                        </TouchableOpacity>

                        <Text style={[styles.temperature, tempColor]}>
                            {tempLabel}° {item.temperatureUnit}
                        </Text>

                        {allOpen && (
                            <TouchableOpacity
                                style={{minWidth: 60}}
                                onPress={() => router.push({
                                    pathname: '/period-forecast',
                                    params: {
                                        period: item.number,
                                        long: long,
                                        lat: lat,
                                        forecast_locale: forecast_locale,
                                    }
                                },)}>
                                <Text style={styles.shortForecast}>{item.shortForecast}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            }}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 0,
        backgroundColor: "white"
    },
    card: {
        width: 100,
        minHeight: 100,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    periodName: {
        minHeight: 33,
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 12,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    temperature: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 4,
        textAlign: 'center',
    },
    dayTemp: {
        color: 'red',
    },
    nightTemp: {
        color: 'blue',
    },
    shortForecast: {
        fontSize: 12,
        textAlign: 'center',
    }
});

export default Forecasts;
