import React, {useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import styles from "../../styles/constants";
import profileStyles from "../../styles/profile_page";
import * as Haptics from 'expo-haptics';

import { Colors } from '../../styles/colors';

export const Profile = () => {
    const [address, setAddress] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const storedAddress = await AsyncStorage.getItem('address');
        const storedSecret = await AsyncStorage.getItem('secretKey');
        setAddress(storedAddress || '');
        setSecretKey(storedSecret || '');
    };

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Light
        );
    };

    const handleSignOut = async () => {
        await AsyncStorage.multiRemove(['address', 'secretKey']);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Onboarding' as never }],
        });
    };

    return (
        <View style={profileStyles.background}>
            <View style={profileStyles.credContainer}>
                <View style={profileStyles.field}>
                    <Text style={profileStyles.label}>Wallet Address</Text>
                    <View style={profileStyles.box}>
                        <Text style={profileStyles.value}>{address.slice(0,7)}...{address.slice(address.length-7, address.length)}</Text>
                        <TouchableOpacity onPress={() => {copyToClipboard(address)}}>
                            <Octicons name="copy" size={24} color={Colors.BRIGHT_GREEN} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={profileStyles.field}>
                    <Text style={profileStyles.label}>Secret</Text>
                    <View style={profileStyles.box}>
                        <Text style={profileStyles.value}>{'*'.repeat(address.length)}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(secretKey)}>
                            <Octicons name="copy" size={24} color={Colors.BRIGHT_GREEN} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity 
                style={profileStyles.signOutButton} 
                onPress={handleSignOut}
            >
                <Text style={profileStyles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;