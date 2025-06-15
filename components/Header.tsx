import React from 'react';
import {View, Image} from 'react-native';
import getStyles from "@/assets/styles/styles";
import { useTheme } from '@react-navigation/native';
import {useThemeToggle} from "@/components/ThemedContext";


export default function Header() {
    const {colors } = useTheme();
    const styles = getStyles(colors);
    const {currentTheme} = useThemeToggle();
    const icon_image = currentTheme === 'dark'||'clock' ?
        require(`@/assets/images/aura_logo_v6.png`) : require(`@/assets/images/aura_logo_v6.png`)

    return (
            <View>
                <Image
                source={icon_image}
                style={styles.headerIcon}/>
            </View>
    );
}

