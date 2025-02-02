import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Keyboard 
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';

import { useGlobalState } from '../../context/GlobalStateContext';
import * as Clipboard from 'expo-clipboard';
import styles from "../../styles/constants";
import Colors from "../../styles/colors";
import * as Haptics from 'expo-haptics';

const Onboarding = ({navigation}: {navigation: any}) => {
    const { globalState, refreshData } = useGlobalState();
    const [address, setAddress] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState<string | null>(null);
    const videoRef = useRef<Video>(null);

    const handleSubmit = async () => {
        await AsyncStorage.setItem('address', address);
        await AsyncStorage.setItem('secretKey', secretKey);
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
        await refreshData();
        navigation.replace('MainApp');
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
        if (videoError) {
            // Wait a short moment and try to reload the video
            const retryTimer = setTimeout(() => {
                videoRef.current?.loadAsync(require('../../assets/blob.mp4'), {}, false);
            }, 1000);
    
            return () => clearTimeout(retryTimer);
        }
    }, [videoError]);

    useEffect(() => {
        const checkLocalStorage = async () => {
            const storedAddress = await AsyncStorage.getItem('address');
            if (storedAddress) navigation.replace('Splash');
        }
        checkLocalStorage();
    }, []);

    const isFormValid = address.length > 0 && secretKey.length > 0;


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
            <Video
                ref={videoRef}
                source={require('../../assets/blob.mp4')}
                style={[
                    StyleSheet.absoluteFill,
                    // Optionally hide video until ready
                    !isVideoReady && { opacity: 0 }
                ]}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
                onLoad={() => {
                    setIsVideoReady(true);
                    setVideoError(null);
                }}
                onError={(error) => {
                    console.error('Video playback error:', error);
                    setVideoError(error);
                    // Attempt to recover
                    videoRef.current?.playAsync();
                }}
                onPlaybackStatusUpdate={status => {
                    if (!status.isLoaded && isVideoReady) {
                        // If video stops playing but should be playing, restart it
                        videoRef.current?.replayAsync();
                    }
                }}
            />
                <Text style={styles.logoText}>
                        Hyperliquid
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Wallet Address"
                        placeholderTextColor={Colors.WHITE}
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TouchableOpacity 
                        style={styles.pasteButton}
                        onPress={async () => {
                            Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                            );
                            pasteFromClipboard('address')
                        }}
                    >
                        <Octicons name="copy" size={18} color={Colors.BRIGHT_GREEN} />
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
                        onPress={async () => {
                            Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                            );
                            pasteFromClipboard('secret')
                        }}
                    >
                        <Octicons name="copy" size={18} color={Colors.BRIGHT_GREEN} />
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
                    <Text style={styles.submitButtonText}>Connect</Text>

                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const onboardingStyles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: adds a dark overlay
    }
});

export default Onboarding;