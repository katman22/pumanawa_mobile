// components/ThemeToggleButton.tsx

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useThemeToggle} from './ThemedContext';
import Ionicons from "@expo/vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import getStyles from "@/assets/styles/styles";

const ThemeToggleButton = () => {
    const {currentTheme, setTheme, themeOptions} = useThemeToggle();
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const handleToggle = () => {
        const currentIndex = themeOptions.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeOptions.length;
        const nextTheme = themeOptions[nextIndex];
        setTheme(nextTheme);
    };

    return (
        <View style={{ alignItems: 'center', marginLeft: 8 }}>
            <TouchableOpacity onPress={handleToggle} style={{ alignItems: 'center' }}>
                <Ionicons name="color-palette-outline" size={24} color={colors.primary} />
                <Text style={styles.buttonTextSmTop}>{currentTheme}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ThemeToggleButton;
