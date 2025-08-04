import { StyleSheet } from 'react-native';
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.BG_3,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DARK_ACCENT,
        margin: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    searchIcon: {
        marginRight: 10,
        color: Colors.BRIGHT_ACCENT,
    },
    searchInput: {
        flex: 1,
        color: Colors.FG_1,
        fontSize: 16,
        paddingVertical: 16,
    },
    clearButton: {
        padding: 8,
        color: Colors.BRIGHT_ACCENT,
    },
    resultsContainer: {
        paddingHorizontal: 16,
        marginBottom: 80,
    },
    sectionTitle: {
        color: Colors.FG_3,
        fontSize: 15,
        marginTop: 8,
        // marginBottom: 8,
    },
    tickerCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        width: '100%',
        paddingBottom: 12,
        paddingTop: 12,
        backgroundColor: Colors.BG_3
    },
    separator: {
        borderBottomColor: Colors.BG_1,
        borderBottomWidth: 1,
        width: '100%'
    },
    leverage: {
        fontSize: 15,
        marginBottom: 0,
        fontWeight: 'bold',
        color: Colors.BRIGHT_ACCENT
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
        color: Colors.FG_1,
        fontSize: 15,
        fontWeight: 600,
    },
    tickerPrice: {
        color: Colors.FG_1,
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
    sortHeaderContainer: {
        paddingHorizontal: 16,
        marginBottom: 4,
        marginTop: 4,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        marginRight: 8,
        borderRadius: 5,
        paddingHorizontal: 12,
        backgroundColor: Colors.BG_1,
        marginBottom: 16,
    },
    sortButtonActive: {
        backgroundColor: Colors.BRIGHT_ACCENT,
    },
    sortButtonText: {
        color: Colors.FG_1,
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
    },
    sortButtonTextActive: {
        color: Colors.BG_1,
        fontWeight: 600,
    },
    sortIcon: {
        marginLeft: 4,
        color: Colors.BG_1,
    },
});

export default styles;