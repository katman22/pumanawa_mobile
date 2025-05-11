// import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, useColorScheme} from 'react-native';
import React, {useState} from "react";
import getStyles from '@/assets/styles/styles';
import {AntDesign} from "@expo/vector-icons";


type Props = {
    location: string;
    setLocation: (value: string) => void;
    loading: boolean;
    fetchLocations: () => void;
};

const WeatherInput: React.FC<Props> = ({setLocation, fetchLocations, loading, location}) => {
    const [isInputCollapsed, setCollapseInput] = useState(false);
    const colorScheme = useColorScheme() || 'light';
    const styles = getStyles(colorScheme)
    return (
        <View style={styles.collapsibleContainer}>
            <TouchableOpacity onPress={() => setCollapseInput(!isInputCollapsed)}
                              style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{lineHeight: 26, marginTop: 5, marginRight: 5}}>
                    {isInputCollapsed ? <AntDesign name="downcircleo" size={12} color="black" /> : <AntDesign name="upcircleo" size={12} color="black" />}
                </Text>
                <Text style={styles.collapsibleText}>Find your local weather <Text style={{fontSize: 10}} >(US Version)</Text></Text>
            </TouchableOpacity>
            {( !isInputCollapsed &&
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a location"
                    value={location}
                    onSubmitEditing={fetchLocations}
                    onChangeText={setLocation}
                />
                <TouchableOpacity
                    style={[styles.goButton, loading && styles.goButtonDisabled]}
                    onPress={fetchLocations}
                    disabled={loading}
                >
                    <Text style={[styles.goButtonText, loading && styles.goButtonTextDisabled]}>
                        {loading ? 'Loading…' : 'Go'}
                    </Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    )
        ;
};

export default WeatherInput;
