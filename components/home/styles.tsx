import { StyleSheet } from 'react-native';

import { Colors } from "../../styles/colors";
import { NAVBAR_HEIGHT } from '../../common/constants';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.BG_3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    balanceContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    balanceLabel: {
        color: Colors.FG_2,
        fontSize: 16,
        marginBottom: 8,
    },
    balanceAmount: {
        color: Colors.FG_1,
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
        color: Colors.FG_1,
        fontSize: 14,
    },
    availableBalanceAmount: {
        color: Colors.FG_1,
        fontSize: 15,
        fontWeight: 'bold',
    },
    closeAllText: {
        color: Colors.BRIGHT_ACCENT, 
        fontSize: 14, 
        fontWeight: 600, 
        marginRight: 6 
    },
    scrollView: {
        paddingHorizontal: 10,
        marginBottom: NAVBAR_HEIGHT,
    },
    noPositionText: {
        textAlign: 'center',
        color: Colors.FG_3,
        fontSize: 15,
        marginTop: 40,
        fontWeight: 600,
    },
    positionCell: {
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.BG_1,
    },
    leftSide: {
        justifyContent: 'space-between',
    },
    rightSide: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    ticker: {
        color: Colors.FG_1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    size: {
        color: Colors.FG_3,
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
        fontSize: 10,
        marginTop: 2,
    },
    price: {
        color: Colors.FG_1,
        fontSize: 16,
        marginBottom: 0,
        fontWeight: 'bold'
    },
});

export default styles;