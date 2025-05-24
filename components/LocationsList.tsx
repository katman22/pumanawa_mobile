// import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, useColorScheme} from 'react-native';
import React from "react";
import getStyles from '@/assets/styles/styles';
import { LocationData } from "@/constants/types"

type Props = {
    locationWeather: (location: LocationData) => void;
    locationsFound: LocationData[]
};

const LocationsList: React.FC<Props> = ({locationWeather, locationsFound}) => {
const colorScheme = useColorScheme() || 'light';
const styles = getStyles(colorScheme)
    return (
        <View style={[styles.locationListContainer]}>
            <FlatList
                data={locationsFound}
                keyExtractor={(item) => item.lat + '-' + item.lng}
                initialNumToRender={3}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => locationWeather(item)}
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
