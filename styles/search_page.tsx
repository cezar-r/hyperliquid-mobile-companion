import { StyleSheet } from 'react-native';
import { Colors } from "./colors";

export const searchStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_DARK_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DARK_GREEN,
        margin: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: Colors.GRAY,
    },
    searchIcon: {
        marginRight: 10,
        color: Colors.BRIGHT_GREEN,
    },
    searchInput: {
        flex: 1,
        color: Colors.WHITE,
        fontSize: 16,
        paddingVertical: 16,
    },
    clearButton: {
        padding: 8,
        color: Colors.BRIGHT_GREEN,
    },
    resultsContainer: {
        paddingHorizontal: 16,
        marginBottom: 80,
    },
    sectionTitle: {
        color: Colors.LIGHT_GRAY,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 8,
    },
    tickerCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        width: '100%',
        paddingBottom: 14,
        paddingTop: 14,
        backgroundColor: Colors.DARK_DARK_GREEN
    },
    separator: {
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1,
        width: '100%'
    },
    leverage: {
        fontSize: 15,
        marginBottom: 0,
        fontWeight: 'bold',
        color: Colors.BRIGHT_GREEN
    },
    tickerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 5,
    },
    tickerSymbol: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 600,
    },
    tickerPrice: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 600,
        marginRight: 2
    },
    pctChange: {
        fontSize: 12,
        marginTop: 4,
    },
    recentHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
    searchResultContainer: {
        marginTop: 26,
    }
});

export default searchStyles;