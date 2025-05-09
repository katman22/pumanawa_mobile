// import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Forecasts from "@/components/Forecasts";
import {styles} from '@/assets/styles';

type ForecastItem = {
  name: string;
  icon: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
};

type Props = {
  weatherList: {
    forecast_locale: string;
    forecasts: ForecastItem[];
  }[];
  removeForecast: (forecast_locale: string) => void;
};

const ForecastScroller: React.FC<Props> = ({ weatherList, removeForecast }) => {
  return (
      <ScrollView
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 100 }}
      >
        {weatherList.map((item, index) => (
            <View key={index} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => removeForecast(item.forecast_locale)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>

                <Text style={styles.forecastHeading}>{item.forecast_locale}</Text>
              </View>
              <Forecasts forecasts={item.forecasts} />
            </View>
        ))}
      </ScrollView>
  );
};

export default ForecastScroller;
