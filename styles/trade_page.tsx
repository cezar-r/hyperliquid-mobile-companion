import { StyleSheet } from 'react-native';
import Colors from "./colors";

const tradeStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
    },
    header: {
        marginTop: 65,
        marginLeft: 20,
        marginBottom: 10,
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
        marginTop: 3,
    },
    price: {
        fontSize: 32,
        marginBottom: 3,
    },
    sectionTitle: {
        color: Colors.WHITE,
        fontSize: 24,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 3,
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
        paddingVertical: 8,
        paddingHorizontal: 2,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.GRAY,
    },
    divider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        borderBottomWidth: 1,
        borderBottomColor: Colors.WHITE,
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
        fontSize: 14,
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 22,
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
        fontSize: 15,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        paddingHorizontal: 6,
        bottom: 28,
        width: '100%',
        left: 0,
        right: 0,
    },
    button: {
        paddingVertical: 18,
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
      },
      valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      editIcon: {
        marginLeft: 8,
      },
      modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: Colors.DARK_DARK_GREEN,
        padding: 18,
        paddingVertical: 20,
        paddingBottom: 30,
        borderRadius: 5,
        width: '90%',
      },
      modalClose: {
        alignSelf: 'flex-end',
      },
      tpslContainer: {
        marginVertical: 16,
      },
      tpslRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
      },
      tpslHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      },
      headerTitle: {
        color: Colors.WHITE,
        fontSize: 20,
        fontWeight: 500,
      },
      priceInput: {
        flex: 1,
        color: Colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY,
        padding: 8,
      },
      percentChange: {
        marginHorizontal: 8,
        minWidth: 60,
        marginTop: 22,
        fontSize: 12,
      },
      profitValue: {
        minWidth: 80,
        textAlign: 'right',
        marginTop: 18,
        marginLeft: 20,
        fontSize: 16,
      },
      submitButton: {
        backgroundColor: Colors.BRIGHT_GREEN,
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
      },
      submitButtonText: {
        color: Colors.BLACK,
        fontWeight: 600,
        fontSize: 14,
      },
});

export default tradeStyles