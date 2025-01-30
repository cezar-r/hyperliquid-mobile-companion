import { StyleSheet } from 'react-native';

import { Colors } from "./colors";

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
        paddingTop: 18,
        paddingBottom: 12,
    },
    availableBalanceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 9,
        alignItems: 'center',
    },
    availableBalanceLabel: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
    },
    availableBalanceAmount: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    positionCell: {
        backgroundColor: Colors.DARK_GREEN,
        borderRadius: 6,
        paddingHorizontal: 13,
        paddingVertical: 8,
        marginBottom: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.BRIGHT_GREEN,
    },
    leftSide: {
        justifyContent: 'space-between',
    },
    rightSide: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    ticker: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    size: {
        color: Colors.WHITE,
        fontSize: 14,
    },
    leverage: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    pnl: {
        fontSize: 14,
    }
});

export default homeStyles;