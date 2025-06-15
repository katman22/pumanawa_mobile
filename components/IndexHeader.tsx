import React from 'react';
import {View, Image} from 'react-native';
import getStyles from "@/assets/styles/styles";
import {useThemeToggle} from "@/components/ThemedContext";
import {useTheme} from '@react-navigation/native';


export default function Header() {
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const {currentTheme} = useThemeToggle();
    const icon_image = ['dark','clock'].includes(currentTheme) ?
        require(`@/assets/images/aura_logo_v6.png`) : require(`@/assets/images/aura_logo_v6.png`)
    return (
        <View>
            <View style={styles.indexLogo}>
                <Image
                    source={icon_image}
                    style={styles.indexIcon}
                />
            </View>
        </View>
    );
}

