import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteLimitOrder = async (
    ticker: string,
    isTp: boolean,
) => {
    try {
        // Retrieve the existing dictionary from AsyncStorage
        const existingData = await AsyncStorage.getItem('limitOrders');
        let limitOrders = existingData ? JSON.parse(existingData) : {};

        // Initialize the ticker entry if it doesn't exist
        if (!limitOrders[ticker]) {
            return;
        }

        // Update the TP or SL entry for the ticker
        if (isTp) {
            limitOrders[ticker].tp = { price: null, cloid: null };
        } else {
            limitOrders[ticker].sl = { price: null, cloid: null };
        }

        // Save the updated dictionary back to AsyncStorage
        await AsyncStorage.setItem('limitOrders', JSON.stringify(limitOrders));

    } catch (error) {
        console.error("Error saving limit order to storage:", error);
        throw error;
    }
};