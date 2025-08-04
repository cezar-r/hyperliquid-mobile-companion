import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithTimeout } from '../fetch_with_timeout';
import { config } from '../config';

export const placeOrder = async (
    ticker,
    isBuy,
    sz,
    leverage,
    isCross
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = config.HYPERLIQUID_LAMBDA_URL;

    const payload = {
        action: "place",
        args: {
            ticker: ticker,
            isBuy: isBuy,
            sz: Number(sz),
            leverage: leverage,
            isCross: isCross
        },
        creds: {
            secret: secretKey,
            address: address
        }
    };
    console.log(payload);

    const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return response.json();
}