import AsyncStorage from '@react-native-async-storage/async-storage';

export const placeOrder = async (
    ticker,
    isBuy,
    sz,
    leverage
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = "https://w54bqsqgyssyh5ptefjfsl2mvy0nnnsi.lambda-url.us-east-2.on.aws/";

    const payload = {
        action: "place",
        args: {
            ticker: ticker,
            isBuy: isBuy,
            sz: Number(sz),
            leverage: leverage
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