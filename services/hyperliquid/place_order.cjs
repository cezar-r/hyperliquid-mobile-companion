import AsyncStorage from '@react-native-async-storage/async-storage';

const { Hyperliquid } = require('hyperliquid/dist');

export const placeOrder = async (
    ticker,
    isBuy,
    sz,
    price,
    leverage
) => {
    const secretKey = await AsyncStorage.getItem('secret');
    const address = await AsyncStorage.getItem('address');
    console.log('1');
    const sdk = new Hyperliquid({
        privateKey: secretKey,
        walletAddress: address,
    });
    console.log('2');
    console.log(sz);
    const orderRequest = {
        coin: `${ticker}-PERP`,
        is_buy: isBuy,
        sz: sz,
        limit_px: price,
        order_type: { limit: { tif: 'Gtc' } },
        reduce_only: false,
      };

    const updateLeverageResponse = await sdk.exchange.updateLeverage(
        `${ticker}-PERP`,
        "isolated",
        leverage
      );
    console.log(updateLeverageResponse);
    console.log('3');
    console.log(orderRequest);
    const placeOrderResponse = await sdk.exchange.placeOrder(orderRequest);
    console.log('8');
    console.log(JSON.stringify(placeOrderResponse));

}