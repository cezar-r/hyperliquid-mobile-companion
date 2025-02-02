import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLimitOrderToStorage = async (
    ticker: string,
    price: string,
    isTp: boolean,
    cloid: string,
) => {
    try {
        // Retrieve the existing dictionary from AsyncStorage
        const existingData = await AsyncStorage.getItem('limitOrders');
        let limitOrders = existingData ? JSON.parse(existingData) : {};

        // Initialize the ticker entry if it doesn't exist
        if (!limitOrders[ticker]) {
            limitOrders[ticker] = { tp: null, sl: null };
        }

        // Update the TP or SL entry for the ticker
        if (isTp) {
            limitOrders[ticker].tp = { price: price, cloid: cloid };
        } else {
            limitOrders[ticker].sl = { price: price, cloid: cloid };
        }

        // Save the updated dictionary back to AsyncStorage
        await AsyncStorage.setItem('limitOrders', JSON.stringify(limitOrders));

    } catch (error) {
        console.log("Failed saving limit order to device storage");
    }
};