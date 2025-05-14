import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SecureStoreConfig() {
    const [token, setToken] = useState('');
    const [savedToken, setSavedToken] = useState('');

    const saveToken = async () => {
        await SecureStore.setItemAsync('api_jwt_token', token);
        alert('Token saved!');
    };

    const readToken = async () => {
        const result = await SecureStore.getItemAsync('api_jwt_token');
        setSavedToken(result || 'No token found');
    };

    const deleteToken = async () => {
        await SecureStore.deleteItemAsync('api_jwt_token');
        setSavedToken('');
        alert('Token deleted!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SecureStore Demo</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter API JWT Token"
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
            />
            <Button title="Save Token" onPress={saveToken} />
            <Button title="Read Token" onPress={readToken} />
            <Button title="Delete Token" onPress={deleteToken} />
            {savedToken ? <Text style={styles.token}>Stored Token: {savedToken}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
    token: { marginTop: 20, fontStyle: 'italic' },
});
