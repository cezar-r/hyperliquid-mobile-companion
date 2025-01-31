import AsyncStorage from '@react-native-async-storage/async-storage';

const { Hyperliquid } = require('hyperliquid/dist');


export const getUserState = async () => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');
    const sdk = new Hyperliquid({
        privateKey: secretKey
    });
    
    return {
        perps: await sdk.info.perpetuals.getClearinghouseState(address, true),
        spot: await sdk.info.spot.getSpotClearinghouseState(address, true),
    }
}