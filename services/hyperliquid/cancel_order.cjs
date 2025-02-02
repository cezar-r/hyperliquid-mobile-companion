import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithTimeout } from '../fetch_with_timeout';

export const cancelOrder = async (
    ticker,
    cloid
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = "https://w54bqsqgyssyh5ptefjfsl2mvy0nnnsi.lambda-url.us-east-2.on.aws/";

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