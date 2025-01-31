import { StyleSheet } from 'react-native';
import Colors from "./colors";

const tradeStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
    },
    header: {
        marginTop: 60,
        marginLeft: 20,
        marginBottom: 20,
    },
    headerSplit: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.GRAY,
    },
    backArrow: {
        top: 60,
        marginLeft: 10,
        marginBottom: 8,
        color: Colors.BRIGHT_GREEN,
    },
    ticker: {
        color: Colors.WHITE,
        fontSize: 42,
        fontWeight: 700,
        marginBottom: 0,
    },
    price: {
        fontSize: 32,
        marginBottom: 3,
    },
    sectionTitle: {
        color: Colors.WHITE,
        fontSize: 20,
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 6,
        fontWeight: 500,
    },
    tableContainer: {
        paddingHorizontal: 20,
        // backgroundColor: Colors.DARK_DARK_GREEN,
        paddingVertical: 6
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // paddingHorizontal: 3,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.GRAY,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.GRAY,
    },
    label: {
        color: Colors.LIGHT_GRAY,
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
        fontWeight: '600',
    },
    value: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        paddingHorizontal: 6,
        bottom: 50,
        width: '100%',
        left: 0,
        right: 0,
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    sellButtonText: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 600,
    },
    buyButtonText: {
        color: Colors.BLACK,
        fontSize: 15,
        fontWeight: 600,
    },
    noPositionText: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
        fontSize: 16,
        marginTop: 40,
        fontWeight: 600,
    },
    percentageChange: {
        fontSize: 12,
        marginLeft: 6,
        fontWeight: 'bold',
      },
      percetangeLabel: {
        color: Colors.WHITE,
        marginLeft: 4,
        fontSize: 12,
      }
});

export default tradeStyles