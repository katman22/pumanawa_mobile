// components/InlineAd.tsx
import React from 'react';
import { View, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function InlineAd() {
    const adUnitId = __DEV__
        ? TestIds.BANNER
        : Platform.OS === 'ios'
            ? "ca-app-pub-6336863096491370/6335048839"
            : "ca-app-pub-6336863096491370/8366331718";

    return (
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{ requestNonPersonalizedAdsOnly: true }}
            />
        </View>
    );
}
