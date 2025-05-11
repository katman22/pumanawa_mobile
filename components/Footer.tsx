import React from 'react';
import {View, Image, StyleSheet, useColorScheme} from 'react-native';


export default function Footer() {
  const colorScheme = useColorScheme() || 'light';
  const imageMap = {
    light: require('@/assets/images/wharehokohoko_kam.png'),
    dark: require('@/assets/images/wharehokohoko_kam_white.png'),
  };
  const imageSource = imageMap[colorScheme];

  return (
        <View style={styles.footer}>
          <Image
              source={imageSource}
              style={styles.logo}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'flex-end',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 5
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});
