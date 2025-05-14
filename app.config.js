import 'dotenv/config';
import * as SecureStore from 'expo-secure-store';

export default {
    expo: {
        name: "pumanawa_mobile",
        slug: "pumanawa_mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "pumanawamobile",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true,
            package: "com.onrender.pumanawa_kam" // Your Android package name
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ],
            "expo-secure-store"
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            apiJwtToken: process.env.API_JWT_TOKEN,
            router: {},
            eas: {
                projectId: "3114d2ad-a648-48a6-972f-359b4c7c6e16" // Pumanawa Mobile project ID
            }
        }
    }
};
