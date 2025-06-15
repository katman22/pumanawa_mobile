// app/(tabs)/index.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {fetchWeather, fetchLocations} from "@/hooks/UseWeatherService";
import getStyles from '@/assets/styles/styles';
import ForecastScroller from '@/components/ForecastScroller';
import WeatherInput from "@/components/WeatherInput";
import RecentList from "@/components/RecentList";
import {AntDesign} from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from "@/components/IndexFooter";
import ZoomWrapper from "@/components/ZoomWrapper";
import {LocationData, LocationForecast} from "@/constants/types"
import {getRecentSearches, saveRecentSearch} from "@/constants/utilities/recentSearches"
import {useTheme} from '@react-navigation/native';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import IndexHeader from '@/components/IndexHeader';


export default function HomeScreen() {
    const {colors} = useTheme();
    const styles = getStyles(colors);
    const [location, setLocation] = useState('');
    const [locationsFound, setLocationResponse] = useState<LocationData []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [weatherList, setWeatherList] = useState<LocationForecast[]>([]);
    const [recentLocations, setRecent] = useState<LocationData []>([]);
    const [isInputCollapsed, setCollapseInput] = useState(false);
    const [isPinned, setPinned] = useState(false);
    const removeForecast = (forecast_to_remove: string) => {
        setWeatherList((prev) => prev.filter(f => f.forecast_locale != forecast_to_remove));
    }
    const [isRecentCollapsed, setIsRecentCollapsed] = useState(false);
    const collapseRecent = () => {
        if (isPinned) return; // Skip collapse if pinned
        setIsRecentCollapsed(true);
    };

    const manageCollapseInput = (shouldCollapse: boolean) => {
        setCollapseInput(shouldCollapse)
        if (!shouldCollapse) {
            setIsRecentCollapsed(true);
        }

    };

    const expandRecent = () => {
        setPinned(false)
        setIsRecentCollapsed(false);
    };

    useEffect(() => {
        getRecentSearches().then(setRecent);
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const history = await getRecentSearches();
                const favorites = history.filter(loc => loc.favorite);

                const forecasts = await Promise.all(
                    favorites.map(async (fav) => {
                        const { lat, long, forecast_locale, forecasts } = await fetchWeather(fav);
                        return {
                            lat,
                            long,
                            forecast_locale,
                            forecasts,
                            favorite: true,
                            name: fav.name
                        };
                    })
                );
                const withForecasts = forecasts.filter(item => item.forecasts.length > 0);

                if (withForecasts.length > 0) {
                    setCollapseInput(true);     // collapse input box
                    setIsRecentCollapsed(true); // collapse history
                }
                // Set initial favorites forecast
                setWeatherList(forecasts);
            } catch (err) {
                console.error("Error loading favorites on start:", err);
            }
        };

        fetchFavorites();
    }, []);




    const locationWeather = async (location: LocationData) => {
        try {
            setLoading(true);
            setCollapseInput(true);
            collapseRecent();
            const {lat, long, forecast_locale, forecasts} = await fetchWeather(location);
            setLocationResponse((prev) => prev.filter((loc) => loc.lat !== location.lat || loc.lng !== location.lng));
            await saveRecentSearch(location);
            const updatedHistory = await getRecentSearches();
            setRecent(updatedHistory);
            setWeatherList((prev) => {
                const exists = prev.find(f => f.forecast_locale === forecast_locale);
                if (exists) {
                    return prev.map(f =>
                        f.forecast_locale === forecast_locale
                            ? { lat, long, forecast_locale, forecasts, favorite: location.favorite ?? false, name: location.name }
                            : f
                    );
                } else {
                    return [...prev, { lat, long, forecast_locale, forecasts, favorite: location.favorite ?? false, name: location.name }];
                }
            });


            setError(null);
        } catch (err) {
            setError(`Error fetching location: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchLocations = async () => {
        try {
            setLoading(true);
            collapseRecent();
            const results = await fetchLocations(location);
            setLocationResponse(results);
            setError(null);
        } catch (err) {
            console.log(err)
            setError('Error fetching location');
            setLocationResponse([]);
        } finally {
            setLoading(false);
        }
    };

    const refreshAllForecasts = async () => {
        if (weatherList.length === 0) return;

        setLoading(true);
        try {
            const updated = await Promise.all(
                weatherList.map(async (item) => {
                    const {forecasts} = await fetchWeather({
                        lat: item.lat,
                        lng: item.long,
                        name: item.forecast_locale,
                    });
                    return {
                        ...item,
                        forecasts,
                    };
                })
            );
            setWeatherList(updated);
            getRecentSearches().then(setRecent);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(`Error refreshing forecasts: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ZoomWrapper>
            <View style={(styles.parentContainer)}>


                <View style={styles.container}>
                    <View style={styles.buttonRow}>
                        <View style={styles.leftGroup}>
                            {isInputCollapsed && (
                                <TouchableOpacity style={styles.floatingButton} onPress={() => manageCollapseInput(false)}>
                                    <Text style={styles.buttonText}>Add Location</Text>
                                </TouchableOpacity>
                            )}
                            {recentLocations.length > 0 && isRecentCollapsed && (
                                <TouchableOpacity style={styles.floatingButton} onPress={() => expandRecent()}>
                                    <Text style={styles.buttonText}>History</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.rightGroup}>
                            <TouchableOpacity onPress={refreshAllForecasts} style={{ padding: 8, alignItems: 'center' }}>
                                <Ionicons name="refresh-circle-outline" size={24} color={colors.primary} style={{marginTop: 5 }} />
                                <Text style={styles.refreshTextSm}>Refresh</Text>
                            </TouchableOpacity>
                        <ThemeToggleButton/>
                            <IndexHeader/>
                        </View>
                    </View>
                    <WeatherInput setLocation={setLocation} isInputCollapsed={isInputCollapsed}
                                  fetchLocations={handleFetchLocations} setCollapseInput={setCollapseInput}
                                  loading={loading}
                                  location={location}
                                  locationsFound={locationsFound}
                                  locationWeather={locationWeather}/>

                    {error &&
                        <Text style={styles.error}>{error}</Text>
                    }


                    {recentLocations.length > 0 && !isRecentCollapsed && (
                        <View style={styles.collapsibleContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                {/* Left side: Title + Controls */}
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.collapsibleTextSm}>History</Text>

                                    <TouchableOpacity onPress={() => collapseRecent()} style={{marginLeft: 8}}>
                                        <AntDesign name="upcircleo" size={16} color={colors.primary}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setPinned(prev => !prev)} // Your pin toggle logic
                                        style={{marginLeft: 8}}
                                    >
                                        <AntDesign name={isPinned ? 'pushpin' : 'pushpino'} color={colors.primary} size={16}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {!isRecentCollapsed && (
                                <View style={{position: 'relative'}}>
                                    <RecentList
                                        recentFound={recentLocations}
                                        locationWeather={locationWeather}
                                        setRecent={setRecent}
                                    />
                                    {loading && (
                                        <View style={styles.collapsibleMask}>
                                            <ActivityIndicator size="small" color="#000"/>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )}

                    {weatherList.length > 0 && (
                        loading ? (
                            <View style={{paddingVertical: 20}}>
                                <ActivityIndicator size="large" color={colors.primary}/>
                            </View>
                        ) : (
                            <View style={{marginBottom  : 600}}>
                            <ForecastScroller
                                weatherList={weatherList}
                                removeForecast={removeForecast}
                                setRecent={setRecent}
                                setWeatherList={setWeatherList}
                            />
                            </View>
                        )
                    )}

                    <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <Footer/>
                    </View>
                </View>
            </View>
        </ZoomWrapper>
    );
}
