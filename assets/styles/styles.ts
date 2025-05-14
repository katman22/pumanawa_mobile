import {StyleSheet} from "react-native";

const getStyles = (scheme: 'light' | 'dark' | null) => {
    const isDark = scheme === 'dark';
    return StyleSheet.create({
        forecastHeading: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: -20,
            marginBottom: 10,
            marginLeft: 30,
            color: isDark ? '#fff' : '#000'
        },
        fullForecastHeading: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 10,
            marginLeft: 4,
            color: isDark ? '#fff' : '#000'
        },
        parentContainer: {
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: -10
        },
        container: {
            flex: 1,
            padding: 20, marginTop: 20

        },
        header: {fontSize: 24, marginBottom: 20},
        result: {marginTop: 20, fontSize: 18},
        error: {color: 'red', marginTop: 20},
        inputGroup: {
            marginBottom: 16,
            width: '100%',
        },
        input: {
            borderWidth: 1,
            borderColor: isDark ? '#fff' : '#ccc',
            backgroundColor: '#fff',
            borderRadius: 4,
            padding: 10,
            marginBottom: 8, // space between input and button
        },
        goButton: {
            alignSelf: 'flex-end', // aligns the button to the right
            backgroundColor: '#007AFF',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 4,
        },
        goButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        goButtonDisabled: {
            backgroundColor: '#ccc',
        },
        goButtonTextDisabled: {
            color: '#666',
        },
        locationListContainer: {
            position: 'relative',
            maxHeight: 200,
            overflow: 'hidden',
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
        },
        hourlyContainer: {
            position: 'relative',
            maxHeight: 280,
            minHeight: 280,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
        },
        evenRow: {
            backgroundColor: '#f9f9f9',
        },

        oddRow: {
            backgroundColor: '#e0e0e0',
        },
        locationItem: {
            padding: 12,
        },
        closeButton: {
            fontSize: 12,
            color: 'gray',
            borderWidth: 1,
            borderColor: '#e9ecef'
        },
        collapsibleContainer: {
            backgroundColor: isDark ? '#ccc' : '#f0f0f0',
            borderColor: isDark ? '#fff' : '#e9ecef',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginVertical: 10,
        },
        fullForecastContainer: {
            backgroundColor: isDark ? '#ccc' : '#f0f0f0',
            borderColor: isDark ? '#fff' : '#e9ecef',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginTop: 10
        },
        hourlyForecastContainer: {
            backgroundColor: isDark ? '#ccc' : '#f0f0f0',
            borderColor: isDark ? '#fff' : '#e9ecef',
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 10,
            padding: 5
        },
        collapsibleMask: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255, 255, 255, 0.6)', // light transparent mask
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            borderRadius: 10,
        },
        antCollapse: {},
        collapsibleText: {
            fontSize: 18,
            marginBottom: 0
        },
        closeAntCircle: {
            fontSize: 14,
            marginBottom: 2,
            marginLeft: 10
        },
        forecastContainer: {
            backgroundColor: isDark ? '#e9ecef' : '#ffffff',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 2,
            marginTop: 2,
        },
        floatingButton: {
            alignSelf: 'flex-start',
            backgroundColor: '#007bff',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginLeft: 10,
            marginTop: -20
        },
        buttonText: {
            color: 'white',
            fontWeight: '600',
        },
        primaryForecastContainer: {
            padding: 16,
            backgroundColor: '#f0f0f0',
            borderRadius: 12,
            marginBottom: 20,
        },
        locationName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        mainForecastRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        forecastDetails: {
            flex: 1,
        },
        periodName: {
            fontSize: 14,
            fontWeight: '600',
        },
        detailsName: {
            fontSize: 14,
            marginLeft: 10,
            marginTop: 10,
            fontWeight: '600',
        },
        hourlyName: {
            fontSize: 14,
            marginLeft: 4,
            marginTop: 2,
            marginBottom: 5,
            fontWeight: '600',
        },
        shortForecast: {
            fontSize: 14,
            color: '#555',
            marginTop: 4,
        },
        wind: {
            fontSize: 14,
            color: '#555',
        },
        precipitation: {
            fontSize: 6,
            color: 'black',
            marginTop: -1
        },
        temp: {
            fontSize: 14,
            color: '#555',
            marginBottom: 9,
        },
        weatherIcon: {
            width: 100,
            height: 100,
            marginLeft: 12,
        },
        detailedForecast: {
            marginLeft: 10,
            fontSize: 14,
            color: '#333',
            lineHeight: 20,
            padding: 5,
            borderRadius: 4,
        },
        detailsContainer: {
            marginTop: 10,
            backgroundColor: '#f9f9f9',
            borderRadius: 4,
        },
        topLoading:{
            marginTop: 100
        },
        horizontalScrollContainer: {
            paddingVertical: 10,
            paddingHorizontal: 5,
        },
        time: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 4,
        },
        forecast: {
            fontSize: 12,
            marginBottom: 2,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        forecastRow: {
            flexDirection: 'row', // Stack the rows vertically
            marginBottom: 0,
            backgroundColor: '#f1f1f1',
            borderRadius: 0,
            paddingVertical: 0,
        },
        forecastColumn: {
            flexDirection: 'column', // Arrange the data vertically in each column
            // justifyContent: 'center',
            // alignItems: 'center',
            marginRight: 1, // Space between columns
            padding: 2,
            // backgroundColor: '#ffffff',
            borderRadius: 1,
            width: 120, // Width of each column
        },
        tempColumn: {
            flexDirection: 'column', // Arrange the data vertically in each column
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 1, // Space between columns
            padding: 2,
            // backgroundColor: '#ffffff',
            borderRadius: 1,
            width: 80, // Width of each column
        },
        forecastDayColumn: {
            flexDirection: 'column', // Arrange the data vertically in each column
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginRight: 1, // Space between columns
            padding: 2,
            // backgroundColor: '#ffffff',
            borderRadius: 1,
            width: 80, // Width of each column
        },
        radarHeading: {
            fontSize: 14,
            marginBottom: 0,
            marginTop: 20,
            fontWeight: '600'
        },
        subHeading: {fontSize: 20, marginBottom: 0},
    });
}

export default getStyles;