import { StyleSheet } from 'react-native';
import { Colors } from "./colors";

export const searchStyles = StyleSheet.create({
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
    resultsContainer: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: Colors.WHITE,
        fontSize: 14,
        marginBottom: 8,
        marginTop: 8,
    },
    tickerCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.BLACK,
        padding: 15,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: Colors.WHITE,
    },
    tickerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickerSymbol: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tickerPrice: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
    },
    recentHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
});

export default searchStyles;