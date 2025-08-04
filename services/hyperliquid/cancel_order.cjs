import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithTimeout } from '../fetch_with_timeout';
import { config } from '../config';

export const cancelOrder = async (
    ticker,
    cloid
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = config.HYPERLIQUID_LAMBDA_URL;

    const payload = {
        action: "cancel",
        args: {
            ticker: ticker,
            cloid: cloid,
        },
        creds: {
            secret: secretKey,
            address: address
        }
    };

    const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return response.json();
}