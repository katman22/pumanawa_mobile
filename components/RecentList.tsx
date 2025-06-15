// import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from "react";
import getStyles from '@/assets/styles/styles';
import {LocationData} from "@/constants/types"
import {useTheme} from "@react-navigation/native";

import {AntDesign} from '@expo/vector-icons';
import {removeRecentSearch} from "@/constants/utilities/recentSearches";

type Props = {
    locationWeather: (location: LocationData) => void;
    recentFound: LocationData[];
    setRecent: React.Dispatch<React.SetStateAction<LocationData[]>>;
};

const   RecentList: React.FC<Props> = ({locationWeather, recentFound, setRecent}) => {
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const handleRemoveFromRecent = async (itemToRemove: LocationData) => {
        try {
            await removeRecentSearch(itemToRemove);

            // Update local state immediately
            setRecent(prev =>
                prev.filter(
                    item =>
                        !(
                            item.lat === itemToRemove.lat &&
                            item.lng === itemToRemove.lng &&
                            item.name === itemToRemove.name
                        )
                )
            );
        } catch (error) {
            console.error('Error removing recent item:', error);
        }
    };


    return (
        <View style={[styles.locationListContainer]}>
            <FlatList
                data={recentFound}
                keyExtractor={(item) => item.lat + '-' + item.lng}
                initialNumToRender={3}
                renderItem={({ item, index }) => (
                    <View
                        style={[
                            {flexDirection: 'row', alignItems: 'center'},
                            styles.locationItem,
                            index % 2 === 0 ? styles.evenRow : styles.oddRow,
                        ]}>
                        <TouchableOpacity
                            onPress={() => handleRemoveFromRecent(item)}
                            style={{ paddingRight: 12 }}
                        >
                            <AntDesign name="delete" size={10} color={colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => locationWeather(item)}
                            style={[
                                styles.locationItem,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow,
                            ]}
                        >
                            <Text style={{ fontSize: 16, color: colors.primary }}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />



        </View>
    );
};

export default RecentList;
