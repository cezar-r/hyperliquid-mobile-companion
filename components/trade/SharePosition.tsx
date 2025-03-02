import React, { useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import styles from './share_position_components/styles';
import Colors from "../../styles/colors";
import { NavigationArgs } from '../navigation';
import { mediumHaptic } from '../common/HapticTypes';
import { SharePositionHeader } from './share_position_components/SharePositionHeader';
import { ShareableArea } from './share_position_components/ShareableArea';
import { SharePositionButton } from './share_position_components/SharePositionButton';


type SharePositionScreenProps = NativeStackScreenProps<NavigationArgs, 'SharePosition'>;

const SharePosition = ({ route, navigation }: SharePositionScreenProps) => {
    const { ticker, entryPrice, markPrice, pnlPercent, pnlValue, leverage, isLong } = route.params;
    const [showDollarPnl, setShowDollarPnl] = useState(false);
    const viewShotRef = useRef<ViewShot | null>(null);
    const [fontsLoaded] = useFonts({
            'Teodor': require('../../assets/fonts/Teodor.otf'),
        });

    if (!fontsLoaded) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.BRIGHT_ACCENT} />
            </View>
        );
    }

    const saveToGallery = async () => {
        if (!viewShotRef.current) {
            console.error('ViewShot ref is not available');
            return;
        }
    
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Media library permission not granted');
                return;
            }

            await mediumHaptic();
            const uri = await viewShotRef.current.capture!();
            
            if (uri) {
                await MediaLibrary.saveToLibraryAsync(uri);
                await mediumHaptic();
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const pnlPctStr = (pnlPercent >= 0 ? '+' : '') + (pnlPercent * 100).toFixed(2) + '%';
    const pnlStr = (pnlValue > 0 ? '+' : '-') + '$' + Math.abs(pnlValue).toFixed(2)

    return (
        <LinearGradient
            colors={[Colors.BG_3, Colors.DARK_ACCENT, Colors.ACCENT]}
            locations={[0, 0.5, .99]}
            start={{ x: .5, y: 1 }}
            end={{ x: .5, y: 0 }}
            style={{ flex: 1 }}
        >
            <SharePositionHeader
                value={showDollarPnl}
                onValueChange={setShowDollarPnl}
                onBackPress={() => navigation.goBack()}
            />

            <ShareableArea
                ref={viewShotRef}
                ticker={ticker}
                isLong={isLong}
                leverage={leverage}
                showDollarPnl={showDollarPnl}
                pnlPercent={pnlPercent}
                pnlStr={pnlStr}
                pnlPctStr={pnlPctStr}
                entryPrice={entryPrice}
                markPrice={markPrice}
            />

            <SharePositionButton
                onPress={saveToGallery}
            />
        </LinearGradient>
    );
};

export default SharePosition;