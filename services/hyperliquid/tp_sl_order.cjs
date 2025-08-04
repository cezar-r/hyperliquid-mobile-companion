import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithTimeout } from '../fetch_with_timeout';
import { config } from '../config';


export const limitTpOrSlOrder = async (
    ticker,
    price,
    isBuy,
    sz,
    isTp
) => {
    const secretKey = await AsyncStorage.getItem('secretKey');
    const address = await AsyncStorage.getItem('address');

    const url = config.HYPERLIQUID_LAMBDA_URL;

    priceArg = isTp ? { tpPrice: Number(price) } : { slPrice: Number(price) };
    const payload = {
        action: isTp ? "tp" : "sl",
        args: {
            ...priceArg,
            ticker: ticker,
            isBuy: isBuy,
            sz: Number(sz),
        },
        creds: {
            secret: secretKey,
            address: address
        }
    }

    const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

    const responseJSON = response.json();
   
    // const cloid = responseJSON.message;
    // await saveLimitOrderToStorage(ticker, price, isTp, cloid);


    return responseJSON;
}