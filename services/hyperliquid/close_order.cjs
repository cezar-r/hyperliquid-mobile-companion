import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config';

export const closeOrder = async (
    ticker
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = config.HYPERLIQUID_LAMBDA_URL;

    const payload = {
        action: "close",
        args: {
            ticker: ticker,
        },
        creds: {
            secret: secretKey,
            address: address
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return await response.json();
}