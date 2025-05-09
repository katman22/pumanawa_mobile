// import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from "react";
import {styles} from '@/assets/styles';

interface LocationData {
  name: string;
  lat: string;
  lng: string
}

type Props = {
  locationWeather: (location: LocationData) => void;
  locationsFound: LocationData[]
};

const LocationsList: React.FC<Props> = ({ locationWeather,  locationsFound}) => {
  return (
      <View style={[styles.locationListContainer]}>
        <FlatList
            data={locationsFound}
            keyExtractor={(item) => item.lat + '-' + item.lng}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => locationWeather(item)()}
                                  style={[
                                    styles.locationItem,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                  ]}
                >
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
  );
};

export default LocationsList;
