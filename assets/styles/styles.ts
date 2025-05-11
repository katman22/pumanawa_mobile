import {StyleSheet} from "react-native";

const getStyles = (scheme: 'light' | 'dark' | null) => {
    const isDark = scheme === 'dark';
    return StyleSheet.create({
        forecastHeading: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: -18,
            marginBottom: 0,
            marginLeft: 38
        },
        parentContainer: {
            flex: 1,
            justifyContent: 'space-between'
        },
        container: {
            flex: 1,
            padding: 20, marginTop: 50
        },
        header: {fontSize: 24, marginBottom: 20},
        subHeading: {fontSize: 20, marginBottom: 0},
        result: {marginTop: 20, fontSize: 18},
        error: {color: 'red', marginTop: 20},
        inputGroup: {
            marginBottom: 16,
            width: '100%',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
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
            backgroundColor: '#f0f0f0',
            borderColor: '#e9ecef',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginVertical: 10,
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
            marginBottom: 0,
            marginLeft: 10
        },
        forecastContainer: {
            backgroundColor: '#ffffff',
            borderColor: '#1e1e1e',
            borderWidth: 1,
            borderRadius: 8,
            padding: 2,
            marginTop: 2,
        }
    });
}

export default getStyles;