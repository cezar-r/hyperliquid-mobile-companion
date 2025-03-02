import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from "./styles";
import Colors from "../../styles/colors";
import { useGlobalState } from '../../context/GlobalStateContext';
import PlaceOrderSheet from './PlaceOrderSheet';
import { getLimitOrderTpSlPrice } from '../../services/get_limit_orders';
import { getLimitOrderCloid } from '../../services/get_limit_order_cloid';
import { limitTpOrSlOrder } from '../../services/hyperliquid/tp_sl_order.cjs';
import { saveLimitOrderToStorage } from '../../services/save_limit_orders';
import { cancelOrder } from '../../services/hyperliquid/cancel_order.cjs';
import { deleteLimitOrder } from '../../services/delete_limit_order';
import { TradeHeaderView, PositionView } from './trade_components';
import { EditTpSlModal } from './trade_components/tp_sl_modal/EditTpSlModal';
import { getTickerUniverseIndex } from '../../common/helpers';
import { mediumHaptic } from '../common/HapticTypes';
import { BackArrow } from '../common/icons/BackArrowIcon';

const Trade = ({ route, navigation }: any) => {
    const { globalState } = useGlobalState();
    const { ticker } = route.params;
    const [isOrderSheetVisible, setIsOrderSheetVisible] = useState(false);
    const [isBuyOrder, setIsBuyOrder] = useState(true);
    const [tpPrice, setTpPrice] = useState('--');
    const [slPrice, setSlPrice] = useState('--');
    const [isTpSlModalVisible, setIsTpSlModalVisible] = useState(false);
    const [tpInput, setTpInput] = useState('');
    const [slInput, setSlInput] = useState('');
    const [setLimitOrder, setSetLimitOrder] = useState(false);


    const position = globalState.userState?.perps.assetPositions.find(
        (item: any) => item.position.coin === ticker
    )?.position;

    const universeIndex = getTickerUniverseIndex(ticker, globalState.perpsMeta?.perpsMeta[0].universe);
    const currentPrice = Number(globalState.perpsMeta?.perpsMeta[1][universeIndex].markPx);
    const prevDayPrice = Number(globalState.perpsMeta?.perpsMeta[1][universeIndex].prevDayPx);
    const price24Change = currentPrice-prevDayPrice;
    const price24ChangePct = (((price24Change)/prevDayPrice))*100;
    const maxLev = Number(globalState.perpsMeta?.perpsMeta[0].universe[universeIndex].maxLeverage);
    const szDecimals = Number(globalState.perpsMeta?.perpsMeta[0].universe[universeIndex].szDecimals);
    
    useEffect(() => {
        const fetchLimitOrders = async () => {
            try {
                if (!setLimitOrder) {
                    const orders = await getLimitOrderTpSlPrice(ticker);
                    setTpPrice(orders.tp);
                    setSlPrice(orders.sl);
                    setSetLimitOrder(true);
                }
            } catch (error) {
                console.error("Error fetching limit orders:", error);
            }
        };

        fetchLimitOrders();
    });

    const submitNewTpSlOrders = async (tpInput: string, slInput: string) => {
        if (tpInput === '' && tpPrice !== "--") {
            const cloid = await getLimitOrderCloid(ticker, true);
            await cancelOrder(ticker, cloid);
            await deleteLimitOrder(ticker, true);
        }
        if (slInput === '' && slPrice !== '--') {
            const cloid = await getLimitOrderCloid(ticker, false);
            await cancelOrder(ticker, cloid);
            await deleteLimitOrder(ticker, false);
        }

        const isLong = Number(position.szi) > 0;
        if (isLong && tpInput||
            !isLong && tpInput
        ) {
            if (tpPrice !== '--') {
                const cloid = await getLimitOrderCloid(ticker, true)
                await cancelOrder(ticker, cloid)
                await deleteLimitOrder(ticker, true);
            }
            const tpResponse = await limitTpOrSlOrder(ticker, Number(tpInput), isLong, Math.abs(Number(position.szi)), true);
            await saveLimitOrderToStorage(ticker, tpInput, true, tpResponse.message);
        }

        if (isLong && slInput && Number(slInput) < Number(currentPrice) ||
            !isLong && slInput && Number(slInput) > Number(currentPrice) 
        ) {
            if (slPrice !== '--') {
                const cloid = await getLimitOrderCloid(ticker, false)
                await cancelOrder(ticker, cloid)
                await deleteLimitOrder(ticker, false);
            }
            const slResponse = await limitTpOrSlOrder(ticker, Number(slInput), isLong, Math.abs(Number(position.szi)), false);
            await saveLimitOrderToStorage(ticker, slInput, false, slResponse.message);
        }
    }

    return (
         <LinearGradient
            colors={[Colors.BG_3, Colors.DARK_ACCENT, Colors.ACCENT]}
            locations={[0, 0.5, .99]}
            start={{ x: .5, y: 1 }}
            end={{ x: .5, y: 0 }}
            style={styles.background}
        >
            <View style={styles.backArrow}>
                <BackArrow onPress={() => navigation.goBack()}/>
            </View>

            <TradeHeaderView
                ticker={ticker}
                currentPrice={currentPrice}
                price24Change={price24Change}
                price24ChangePct={price24ChangePct}
            />
            
            {position ? (
                <PositionView
                    position={position}
                    currentPrice={currentPrice}
                    tpPrice={tpPrice}
                    slPrice={slPrice}
                    onSharePositionPress={() => navigation.navigate('SharePosition', { 
                        ticker,
                        entryPrice: Number(position.entryPx),
                        markPrice: currentPrice,
                        pnlPercent: Number(position.returnOnEquity),
                        pnlValue: Number(position.unrealizedPnl),
                        leverage: position.leverage.value,
                        isLong: Number(position.szi) > 0
                    })}
                    onTpSlModalPress={() => {
                        setTpInput(tpPrice !== "--" ? tpPrice : "");
                        setSlInput(slPrice !== "--" ? slPrice : "");
                        setIsTpSlModalVisible(true);
                    }}
                />
            ) : (
                <Text style={styles.noPositionText}>No open position</Text>
            )}
    
            {/* Trade Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: Colors.RED }]}
                    onPress={async () => {
                        await mediumHaptic();
                        setIsBuyOrder(false);
                        setIsOrderSheetVisible(true);
                    }}
                    >
                    <Text style={styles.sellButtonText}>SELL / SHORT</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: Colors.BRIGHT_ACCENT }]}
                    onPress={async () => {
                        await mediumHaptic();
                        setIsBuyOrder(true);
                        setIsOrderSheetVisible(true);
                    }}
                    >
                    <Text style={styles.buyButtonText}>BUY / LONG</Text>
                </TouchableOpacity>
            </View>

            {isTpSlModalVisible && (
                <EditTpSlModal
                    position={position}
                    onClose={() => setIsTpSlModalVisible(false)}
                    initialTpInput={tpInput}
                    initialSlInput={slInput}
                    onSubmit={async (tpInput: string, slInput: string) => {
                        await submitNewTpSlOrders(tpInput, slInput);
                        setIsTpSlModalVisible(false);
                    }}
                />
            )}
            <PlaceOrderSheet
                visible={isOrderSheetVisible}
                onClose={() => setIsOrderSheetVisible(false)}
                ticker={ticker}
                currentPrice={currentPrice}
                position={position}
                isBuy={isBuyOrder}
                maxLev={maxLev}
                szDecimals={szDecimals}
            />
        </LinearGradient>
    );
};

export default Trade;