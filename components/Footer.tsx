import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


export default function Footer() {
  return (
        <View style={styles.footer}>
          <Image
              source={require('@/assets/images/wharehokohoko_kam.png')}
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
