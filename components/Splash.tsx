import React, { useEffect } from 'react';

import { View, Image } from "react-native";
import styles from "./onboarding/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../context/GlobalStateContext';

const Splash = ({navigation}: {navigation: any}) => {
    const { globalState, refreshData } = useGlobalState();
    useEffect(() => {
        const checkLocalStorage = async () => {
            const storedAddress = await AsyncStorage.getItem('address');
            if (storedAddress) {
                await refreshData();
                navigation.replace('MainApp');
            } else {
                navigation.replace('Onboarding');
            }
        }
        checkLocalStorage();
    }, []);

    return (
        <View style={styles.background}>
            <Image 
                source={require('../assets/blob_green.gif')}
                style={{ 
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
            />
        </View>
    );
}

export default Splash;