import React, {useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import styles from "../../styles/profile_page";
import { lightHaptic } from '../common/HapticTypes';
import { CredentialField } from './components/CredentialField';
import { DisonnectButton } from './components/DisconnetButton';
import { SECRET_KEY_VALUE } from './constants';
import { FieldLabels, LocalStorageKey, PageName } from '../../common/constants';
import { trimAddress } from './helpers';

export const Profile = () => {
    const [address, setAddress] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const storedAddress = await AsyncStorage.getItem(LocalStorageKey.ADDRESS);
        const storedSecret = await AsyncStorage.getItem(LocalStorageKey.SECRET);
        setAddress(storedAddress || '');
        setSecretKey(storedSecret || '');
    };

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        await lightHaptic();
    };

    const handleSignOut = async () => {
        await AsyncStorage.multiRemove([LocalStorageKey.ADDRESS, LocalStorageKey.SECRET]);
        navigation.reset({
            index: 0,
            routes: [{ name: PageName.ONBOARDING as never }],
        });
    };

    return (
        <View style={styles.background}>
            <View style={styles.credContainer}>
                <CredentialField
                    onPress={() => {copyToClipboard(address)}}
                    label={FieldLabels.WALLET_ADDRESS}
                    value={trimAddress(address)}
                />

                <CredentialField
                    onPress={() => {copyToClipboard(secretKey)}}
                    label={FieldLabels.SECRET_KEY}
                    value={SECRET_KEY_VALUE}
                />
            </View>

            < DisonnectButton 
                handleSignOut={handleSignOut}
            />
        </View>
    );
};

export default Profile;