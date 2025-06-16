import React from 'react';
import {View, Platform} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";


export default function Footer() {
    const adUnitId = __DEV__
        ? TestIds.BANNER
        : Platform.OS === 'ios'
            ? "ca-app-pub-6336863096491370/7351709503" // iOS banner unit ID
            : "ca-app-pub-6336863096491370/2870071842"; // Android Banner unit id

    return (
        <View>
            <View style={{marginBottom: 0}}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{requestNonPersonalizedAdsOnly: true}}
                />
            </View>
        </View>
    );
}

