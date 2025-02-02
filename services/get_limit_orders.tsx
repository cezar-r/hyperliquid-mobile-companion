import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLimitOrderTpSlPrice = async (
    ticker: string
) => {
    const orders = await AsyncStorage.getItem('limitOrders');
    if (orders === null) {
        return {
            tp: "--",
            sl: "--"
        }
    }
    const limitOrders = JSON.parse(orders);
    const tickerOrders = limitOrders[ticker];

    if (!tickerOrders) {
        return {
            tp: "--",
            sl: "--"
        }
    }
    
    let tp = tickerOrders.tp?.price ? tickerOrders.tp?.price : "--";
    let sl = tickerOrders.sl?.price ? tickerOrders.sl?.price : "--";

    return {
        tp: tp,
        sl: sl
    }
    
}