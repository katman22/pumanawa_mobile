import React from 'react';
import {View, Image} from 'react-native';
import getStyles from "@/assets/styles/styles";
import { useTheme } from '@react-navigation/native';


export default function Header() {
    const { dark, colors } = useTheme();
    const styles = getStyles(colors);
    const imageSource = dark
        ? require('@/assets/images/whitepoweredby_logo.png')
        : require('@/assets/images/poweredby_logo.png');

    return (
        <View>
            <View style={styles.headerLogo}>
                <Image
                source={require('@/assets/images/icon_v2.png')}
                style={styles.indexIcon}
            />
                <Image
                    source={imageSource}
                    style={styles.indexLogo}
                />
            </View>
        </View>
    );
}

