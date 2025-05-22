import 'dotenv/config';
import * as SecureStore from 'expo-secure-store';

export default {
    expo: {
        name: "Aura Weather Dev",
        slug: "aura-weather",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/dev_icon_lrg.png",
        scheme: "pumanawamobile",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        splash: {
            image: "./assets/images/dev_icon_lrg.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        ios: {
            supportsTablet: false,
            bundleIdentifier: "com.onrender.pumanawa-kam.dev"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon_v2.png",
                backgroundColor: "#ffffff"
            },
            supportsTablet: false,
            edgeToEdgeEnabled: true,
            package: "com.onrender.pumanawa_kam.dev", // Your Android package name
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon_v2.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/dev_icon_lrg.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ],
            "expo-secure-store",
            [
                "react-native-google-mobile-ads",
                {
                    androidAppId: "ca-app-pub-3940256099942544~3347511713", // ✅ test Android ID
                    iosAppId: "ca-app-pub-6336863096491370~9735164410"      // ✅ test iOS ID
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            apiJwtToken: process.env.API_JWT_TOKEN,
            apiServer: process.env.API_SERVER,
            router: {},
            eas: {
                projectId: "1d609ca4-800b-4b6a-bf2c-22867b200de5" // Pumanawa Mobile project ID
            }
        }
    }
};
