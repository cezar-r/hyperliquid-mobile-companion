import { StyleSheet } from 'react-native';

import { Colors } from "./colors";
import { NAVBAR_HEIGHT } from '../common/constants';

export const homeStyles = StyleSheet.create({
    balanceContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    balanceLabel: {
        color: Colors.GRAY,
        fontSize: 16,
        marginBottom: 8,
    },
    balanceAmount: {
        color: Colors.WHITE,
        fontSize: 48,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 6,
    },
    availableBalanceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 9,
        alignItems: 'center',
    },
    availableBalanceLabel: {
        color: Colors.WHITE,
        fontSize: 14,
    },
    availableBalanceAmount: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: 10,
        marginBottom: NAVBAR_HEIGHT,
    },
    noPositionText: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
        fontSize: 15,
        marginTop: 40,
        fontWeight: 600,
    },
    positionCell: {
        // backgroundColor: Colors.DARK_GREEN,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.BLACK,
    },
    leftSide: {
        justifyContent: 'space-between',
    },
    rightSide: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    ticker: {
        color: Colors.WHITE,
        fontSize: 17,
        fontWeight: 'bold',
    },
    size: {
        color: Colors.LIGHT_GRAY,
        fontSize: 12,
    },
    leverage: {
        fontSize: 16,
        marginBottom: 0,
        fontWeight: 'bold',
    },
    pnl: {
        fontSize: 12,
    },
    tickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5,
    },
    
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 0,
    },
    priceChange: {
        // backgroundColor: Colors.DARK_DARK_GREEN,
        fontSize: 10,
        marginTop: 2,
    },
    price: {
        color: Colors.WHITE,
        fontSize: 16,
        marginBottom: 0,
        fontWeight: 'bold'
    },
});

export default homeStyles;