import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

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
  forecasts: ForecastItem[];
};

const Forecasts: React.FC<Props> = ({ forecasts }) => {
  return (
      <FlatList
          horizontal
          data={forecasts}
          keyExtractor={(item, index) => item.name + index}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => {
            const tempLabel = item.isDaytime ? `High ${item.temperature}` : `Low ${item.temperature}`;
            const tempColor = item.isDaytime ? styles.dayTemp : styles.nightTemp;

            return (
                <View style={styles.card}>
                  <Text style={styles.periodName}><Text style={{ fontWeight: 'bold' }}>{item.name}</Text></Text>
                  <Image
                      source={{ uri: item.icon }}
                      style={styles.icon}
                      accessibilityLabel={item.detailedForecast}
                  />
                  <Text style={[styles.temperature, tempColor]}>{tempLabel}° {item.temperatureUnit}</Text>
                  <Text style={styles.shortForecast}>{item.shortForecast}</Text>
                </View>
            );
          }}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  card: {
    width: 100,
    minHeight: 150,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  periodName: {
    minHeight: 48,
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
  },
});

export default Forecasts;
