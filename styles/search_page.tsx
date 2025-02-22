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
    },
    searchInput: {
        flex: 1,
        color: Colors.WHITE,
        fontSize: 16,
        paddingVertical: 16,
    },
    clearButton: {
        padding: 8,
    },
    resultsContainer: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: Colors.LIGHT_GRAY,
        fontSize: 15,
        marginBottom: 1,
        marginTop: 8,
    },
    tickerCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        width: '100%',
        marginBottom: 20,
    },
    leverage: {
        fontSize: 15,
        marginBottom: 0,
        fontWeight: 'bold',
    },
    tickerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5,
    },
    tickerSymbol: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 600,
    },
    tickerPrice: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 15,
    },
    recentHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        marginBottom: 16,
    },
    searchResultContainer: {
        marginTop: 10,
    }
});

export default searchStyles;