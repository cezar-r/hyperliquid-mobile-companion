import { limitTpOrSlOrder } from "../../services/hyperliquid/tp_sl_order.cjs";
import { saveLimitOrderToStorage } from "../../services/save_limit_orders";

export const handleTpSlOrders = async (
    ticker: string,
    takeProfitPrice: string,
    stopLossPrice: string,
    isBuy: boolean,
    currentPrice: number,
    orderSize: number
) => {
    if (takeProfitPrice !== '' && (
        isBuy && Number(takeProfitPrice) > currentPrice ||
        !isBuy && Number(takeProfitPrice) < currentPrice
    )) {
        const tpResponse = await limitTpOrSlOrder(
            ticker, 
            Number(takeProfitPrice), 
            isBuy,
            Number(orderSize), 
            true
        );
        await saveLimitOrderToStorage(
            ticker, 
            takeProfitPrice, 
            true, 
            tpResponse.message
        );
    } 
    if (stopLossPrice !== '' && (
        isBuy && Number(stopLossPrice) < currentPrice ||
        !isBuy && Number(stopLossPrice) > currentPrice
    )) {
        const slResponse = await limitTpOrSlOrder(
            ticker,
             Number(stopLossPrice), 
            isBuy, 
            Number(orderSize), 
            false
        );
        await saveLimitOrderToStorage(
            ticker, 
            stopLossPrice, 
            false, 
            slResponse.message
        );
    }
}