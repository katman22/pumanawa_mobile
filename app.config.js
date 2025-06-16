import 'dotenv/config';
export default {
    expo: {
        name: "Aura Weather",
        slug: "aura-weather",
        version: "6.0.0",
        orientation: "portrait",
        icon: "./assets/images/aura_logo_v6_splash.png",
        scheme: "pumanawamobile",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        splash: {
            image: "./assets/images/aura_logo_v6.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: false,
            bundleIdentifier: "com.onrender.pumanawa-kam"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/aura_logo_v6.png",
                backgroundColor: "#ffffff"
            },
            supportsTablet: false,
            edgeToEdgeEnabled: true,
            package: "com.onrender.pumanawa_kam",
            versionCode: 26,
            config: {
                googleMaps: {
                    apiKey: "AIzaSyALGiMGxmRvVA84ADB7GqQKzqPpQ7S6Pzc"
                }
            }
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/aura_logo_v6.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/aura_logo_v6.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ],
            "expo-secure-store",
            [
                "react-native-google-mobile-ads",
                {
                    androidAppId: "ca-app-pub-3940256099942544~3347511713",
                    iosAppId: "ca-app-pub-6336863096491370~9735164410"
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
                projectId: "1d609ca4-800b-4b6a-bf2c-22867b200de5"
            }
        }
    }
};
