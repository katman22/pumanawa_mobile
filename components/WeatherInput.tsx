// import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ActivityIndicator, Keyboard} from 'react-native';
import getStyles from '@/assets/styles/styles';
import {AntDesign} from "@expo/vector-icons";
import LocationsList from "@/components/LocationsList";
import React from "react";
import {LocationData} from "@/constants/types";
import {useTheme} from "@react-navigation/native";
import {useThemeToggle} from './ThemedContext';


type Props = {
    location: string;
    setLocation: (value: string) => void;
    loading: boolean;
    fetchLocations: () => void;
    setCollapseInput: (value: boolean) => void;
    isInputCollapsed: boolean;
    locationsFound: LocationData[];
    locationWeather: (location: LocationData) => Promise<void>;
};

const WeatherInput: React.FC<Props> = ({
                                           setLocation,
                                           isInputCollapsed,
                                           fetchLocations,
                                           loading,
                                           location,
                                           setCollapseInput,
                                           locationsFound,
                                           locationWeather
                                       }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const {currentTheme} = useThemeToggle();
    const antClose = currentTheme === 'dark' ? "closecircleo" : "closecircleo"
    return (
        <View>
            {(!isInputCollapsed &&
                <View style={styles.collapsibleContainer}>
                    <TouchableOpacity onPress={() => setCollapseInput(!isInputCollapsed)}
                                      style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{lineHeight: 26, marginTop: 5, marginRight: 5}}>
                            {isInputCollapsed ? <AntDesign name="downcircleo" size={12} color={colors.primary}/> :
                                <AntDesign name="upcircleo" size={12} color={colors.primary}/>}
                        </Text>
                        <Text style={styles.collapsibleTextSm}>Find your local weather <Text style={{fontSize: 6}}>(US
                            Version)</Text></Text>
                    </TouchableOpacity>

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a location"
                            value={location}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                fetchLocations();
                            }}
                            onChangeText={setLocation}
                        />
                        {location.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setLocation('')}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: [{ translateY: -12 }],
                                }}
                            >
                                <AntDesign style={styles.clearInput} name={antClose} size={12} color={colors.primary} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[styles.goButton, loading && styles.goButtonDisabled]}
                            onPress={() => {
                                Keyboard.dismiss();
                                fetchLocations();
                            }}
                            disabled={loading}
                        >
                            <Text style={[styles.goButtonText, loading && styles.goButtonTextDisabled]}>
                                {loading ? 'Loading…' : 'Go'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {locationsFound.length > 0 && (
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.collapsibleTextSm}> Locations</Text>
                            </View>
                            <View style={{position: 'relative'}}>
                                <LocationsList locationsFound={locationsFound} locationWeather={locationWeather}/>
                                {loading && (
                                    <View style={styles.collapsibleMask}>
                                        <ActivityIndicator size="small" color="#000"/>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    )
        ;
};

export default WeatherInput;
