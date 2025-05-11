import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  forecastHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    padding: 20, marginTop: 50
  },
  header: {fontSize: 24, marginBottom: 20},
  subHeading: {fontSize: 14, marginBottom: 10},
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
    maxHeight: 200,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  locationItem: {
    padding: 12,
  },

  evenRow: {
    backgroundColor: '#f9f9f9',
  },

  oddRow: {
    backgroundColor: '#e0e0e0',
  },

  locationText: {
    fontSize: 16,
  },
  closeButton: {
    fontSize: 12,
    color: 'gray',
    padding: 4,
  }
});