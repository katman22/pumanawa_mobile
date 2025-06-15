import React from "react";
import { View, TouchableOpacity} from "react-native";
import getStyles from '@/assets/styles/styles';
import Footer from "@/components/Footer";
import {useTheme} from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import RadarHeader from "@/components/RadarHeader";

export default function AlertsScreen() {
    const {colors} = useTheme();
    const styles = getStyles(colors);


    return (
        <View style={styles.parentRadarContainer}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end', // Aligns entire row to the right
                    alignItems: 'center',       // Vertically align items
                    paddingRight: 0,
                    paddingTop: 10,
                    paddingBottom: 10
                }}
            >
                <TouchableOpacity style={{marginBottom: -20}}>
                    <Ionicons
                        name="refresh-circle-outline"
                        size={24}
                        color={colors.primary}
                    />
                </TouchableOpacity>

                <View style={{marginTop: 32, paddingBottom: 0, marginLeft: 15}}>
                    <ThemeToggleButton/>
                </View>

                <View style={{marginBottom: -20, marginLeft: 15}}>
                    <RadarHeader/>
                </View>
            </View>


            <View style={{marginBottom: -10}}>
                <Footer/>
            </View>
        </View>
    );
}
