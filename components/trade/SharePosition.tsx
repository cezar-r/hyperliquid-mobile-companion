import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Haptics from 'expo-haptics';
import Colors from "../../styles/colors";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useFonts } from 'expo-font';



type SharePositionScreenProps = NativeStackScreenProps<RootStackParamList, 'SharePosition'>;

const SharePosition = ({ route, navigation }: SharePositionScreenProps) => {
    const { ticker, entryPrice, markPrice, pnlPercent, pnlValue, leverage, isLong } = route.params;
    const [showDollarPnl, setShowDollarPnl] = useState(false);
    const viewShotRef = useRef<ViewShot | null>(null);
    const [fontsLoaded] = useFonts({
            'Teodor': require('../../assets/fonts/Teodor.otf'),
        });

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

            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            const uri = await viewShotRef.current.capture!();
            
            if (uri) {
                await MediaLibrary.saveToLibraryAsync(uri);
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
            colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
            locations={[0, 0.5, .99]}
            start={{ x: .5, y: 1 }}
            end={{ x: .5, y: 0 }}
            style={{ flex: 1 }}
        >
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: Platform.OS === 'ios' ? 60 : 20,
                paddingBottom: 20
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color={Colors.BRIGHT_GREEN} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: Colors.WHITE, marginRight: 8 }}>Show $ PNL</Text>
                    <Switch
                        value={showDollarPnl}
                        onValueChange={setShowDollarPnl}
                        trackColor={{ false: Colors.DARK_GREEN, true: Colors.BRIGHT_GREEN }}
                    />
                </View>
            </View>

            <ViewShot 
                ref={viewShotRef}
                style={{ flex: 1 }}
                options={{ 
                    format: "jpg",
                    quality: 1,
                    result: "tmpfile",
                    fileName: `${ticker}_position_${new Date().toISOString().split('T')[0]}_${Math.random().toString(36).substring(2, 8)}.jpg`,
                }}
            >
                <LinearGradient
                    colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
                    locations={[0, 0.5, .99]}
                    start={{ x: .5, y: 1 }}
                    end={{ x: .5, y: 0 }}
                    style={{ flex: 1, padding: 20 }}
                >
                    <View style={{ 
                        alignItems: 'flex-start',
                        // justifyContent: 'center' ,
                        flex: 1,
                        backgroundColor: 'transparent'  // Important
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 180,
                            marginBottom: 20,
                        }}>
                            <Text style={{ 
                                fontSize: 30,
                                color: Colors.WHITE,  // Use explicit white instead of Colors.WHITE
                                fontWeight: 500,
                                // marginBottom: 10,
                            }}>{ticker}</Text>

                            <View style={{
                                marginLeft: 10,
                                backgroundColor: isLong ? Colors.GREEN : Colors.MAROON,
                                paddingVertical: 6,
                                paddingHorizontal: 6,
                                borderRadius: 5,
                            }}>
                                <Text style={{
                                    color: isLong ? Colors.BRIGHT_GREEN : Colors.PINK, 
                                    fontSize: 20, 
                                    fontWeight: 600
                                    }}>
                                    {isLong ? "Long" : "Short"} {leverage}X
                                </Text>
                            </View>
                        </View>
                        
                        <Text style={{ 
                            fontSize: 80,
                            color: pnlPercent >= 0 ? Colors.BRIGHT_GREEN : Colors.RED,
                            // fontWeight: 'bold',
                            fontFamily: 'Teodor',
                            marginBottom: 30
                        }}>{showDollarPnl ? pnlStr : pnlPctStr}</Text>

                        <View style={{
                            flexDirection: "row",
                        }}>
                            <View style={{
                                flexDirection: "column",
                                marginRight: 20,
                            }}>
                                <Text style={{ 
                                    fontSize: 16,
                                    color: Colors.LIGHT_GRAY,
                                    // marginTop: 15,
                                    marginBottom: 10
                                }}>Entry Price</Text>
                                 <Text style={{ 
                                    fontSize: 16,
                                    color: Colors.WHITE,
                                    fontWeight: 600,
                                    marginBottom: 10
                                }}>${entryPrice}</Text>
                            </View>

                            <View style={{
                                flexDirection: "column"
                            }}>
                                <Text style={{ 
                                    fontSize: 16,
                                    color: Colors.LIGHT_GRAY,
                                    // marginTop: 15,
                                    marginBottom: 10
                                }}>Mark Price </Text>
                                 <Text style={{ 
                                    fontSize: 16,
                                    color: Colors.WHITE,
                                    fontWeight: 600,
                                    marginBottom: 10
                                }}>${markPrice}</Text>
                            </View>

                        </View>

                        <View style={{
                            marginTop: 15,
                        }}>
                            <Text style={{ color: Colors.BRIGHT_GREEN, fontWeight: 500 }}>app.hyperliquid.xyz</Text>
                        </View>
                    </View>
                </LinearGradient>
            </ViewShot>

            <TouchableOpacity 
                onPress={saveToGallery}
                style={{
                    backgroundColor: Colors.BRIGHT_GREEN,
                    paddingVertical: 16,
                    marginHorizontal: 20,
                    marginBottom: Platform.OS === 'ios' ? 40 : 20,
                    borderRadius: 5,
                    alignItems: 'center'
                }}
            >
                <Text style={{ 
                    color: Colors.BLACK,
                    fontSize: 16,
                    fontWeight: 600
                }}>Save to Camera Roll</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default SharePosition;