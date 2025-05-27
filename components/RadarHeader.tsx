import React from 'react';
import {View, Image} from 'react-native';
import getStyles from "@/assets/styles/styles";
import { useTheme } from '@react-navigation/native';


export default function RadarHeader() {
    const {colors } = useTheme();
    const styles = getStyles(colors);

    return (
            <View style={{marginLeft: -20, marginTop: 10}}>
                <Image
                source={require('@/assets/images/icon_v2.png')}
                style={styles.radarIcon}/>
            </View>
    );
}

