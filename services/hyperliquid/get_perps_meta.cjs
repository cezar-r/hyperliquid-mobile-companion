import AsyncStorage from '@react-native-async-storage/async-storage';

const { Hyperliquid } = require('hyperliquid/dist');

export const getPerpsMeta = async () => {
    const secretKey = await AsyncStorage.getItem('secretKey');

    const sdk = new Hyperliquid({
        privateKey: secretKey
    });

    return {
        perpsMeta: await sdk.info.perpetuals.getMetaAndAssetCtxs(true)
    };
}