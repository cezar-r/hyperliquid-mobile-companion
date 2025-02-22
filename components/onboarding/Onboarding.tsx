import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    TouchableWithoutFeedback,
    Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

import { useGlobalState } from '../../context/GlobalStateContext';
import styles from "../../styles/onboarding";
import { lightHaptic, successHaptic } from "../common/HapticTypes"
import {
    InputFieldWithPaste,
    Logo,
    VideoBackground,
    ConnectButton
} from './components';

import { isFormValid } from './helpers';
import { InputFieldLabels } from './constants';
import { LocalStorageKey, PageName } from '../../common/constants';

const Onboarding = ({navigation}: {navigation: any}) => {
    const { refreshData } = useGlobalState();
    const [address, setAddress] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = async () => {
        await AsyncStorage.setItem(LocalStorageKey.ADDRESS, address);
        await AsyncStorage.setItem(LocalStorageKey.SECRET, secretKey);
        await successHaptic()
        await refreshData();
        navigation.replace(PageName.MAIN_APP_PAGE);
    }

    const handlePaste = async (field: LocalStorageKey) => {
        const text = await Clipboard.getStringAsync();
        if (field === LocalStorageKey.ADDRESS) {
            setAddress(text);
        } else {
            setSecretKey(text);
        }
        await lightHaptic()
    };

    useEffect(() => {
        const checkLocalStorage = async () => {
            const storedAddress = await AsyncStorage.getItem(LocalStorageKey.ADDRESS);
            if (storedAddress) navigation.replace(PageName.SPLASH_PAGE);
        }
        checkLocalStorage();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>

                <VideoBackground />

                <Logo />

                <InputFieldWithPaste 
                    placeholderText={InputFieldLabels.WALLET}
                    value={address}
                    setValue={setAddress}
                    onPastePress={() => handlePaste(LocalStorageKey.ADDRESS)}
                />

                <InputFieldWithPaste 
                    placeholderText={InputFieldLabels.SECRET}
                    value={secretKey}
                    setValue={setSecretKey}
                    onPastePress={() => handlePaste(LocalStorageKey.SECRET)}
                />
                <ConnectButton 
                    validForm={isFormValid(address, secretKey)}
                    handleSubmit={handleSubmit}
                />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default Onboarding;