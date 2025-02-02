import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLimitOrderCloid = async (
    ticker: string,
    isTp: boolean,
) => {
    const orders = await AsyncStorage.getItem('limitOrders');
    if (orders === null) {
        return ""
    }
    const limitOrders = JSON.parse(orders);
    const tickerOrders = limitOrders[ticker];

    if (!tickerOrders) {
        return ""
    }
    
    if (isTp) {
        return tickerOrders.tp?.cloid ?? ""
    } return tickerOrders.sl?.cloid ?? ""
}