import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Clipboard from 'expo-clipboard';
import styles from "../../styles/constants";
import Colors from "../../styles/colors";

const Onboarding = ({navigation}: {navigation: any}) => {
    const [address, setAddress] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = async () => {
        await AsyncStorage.setItem('address', address);
        await AsyncStorage.setItem('secretKey', secretKey);
        navigation.repalce('MainApp');
    }

    const pasteFromClipboard = async (field: 'address' | 'secret') => {
        const text = await Clipboard.getStringAsync();
        if (field === 'address') {
            setAddress(text);
        } else {
            setSecretKey(text);
        }
    };

    useEffect(() => {
        const checkLocalStorage = async () => {
            const storedAddress = await AsyncStorage.getItem('address');
            if (storedAddress) navigation.replace('MainApp');
        }
        checkLocalStorage();
    }, []);

    const isFormValid = address.length > 0 && secretKey.length > 0;


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor={Colors.WHITE}
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TouchableOpacity 
                        style={styles.pasteButton}
                        onPress={() => pasteFromClipboard('address')}
                    >
                        <Text style={styles.pasteButtonText}>Paste</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Secret Key"
                        placeholderTextColor={Colors.WHITE}
                        value={secretKey}
                        onChangeText={setSecretKey}
                    />
                    <TouchableOpacity 
                        style={styles.pasteButton}
                        onPress={() => pasteFromClipboard('secret')}
                    >
                        <Text style={styles.pasteButtonText}>Paste</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[
                        styles.submitButton,
                        isFormValid ? styles.submitButtonActive : null
                    ]}
                    onPress={handleSubmit}
                    disabled={!isFormValid}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>

                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Onboarding;