import { StyleSheet } from 'react-native';
import Colors from "./colors";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop:60,
        paddingBottom: 20 
    },

    headerRow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },

    headerText: {
        color: Colors.WHITE, 
        marginRight: 8
    },

    background: {
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: 'transparent'
    },

    tickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 180,
        marginBottom: 20,
    },

    tickerLabel: {
        fontSize: 30,
        color: Colors.WHITE,
        fontWeight: 500,
    },

    leverageContainer: {
        marginLeft: 10,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 5,  
    },

    leverageLabel: {
        fontSize: 20, 
        fontWeight: 600 
    },

    pnlContainer: {
        fontSize: 80,
        fontFamily: 'Teodor',
        marginBottom: 30
    },

    priceRow: {
        flexDirection: "row",
    },

    entryColumn: {
        flexDirection: "column",
        marginRight: 20,
    },

    markColumn: {
        flexDirection: "column",
    },

    label: {
        fontSize: 16,
        color: Colors.LIGHT_GRAY,
        marginBottom: 10
    },

    value: {
       fontSize: 16,
        color: Colors.WHITE,
        fontWeight: 600,
        marginBottom: 10 
    },

    urlContainer: {
        marginTop: 15, 
    },

    urlText: {
        color: Colors.BRIGHT_GREEN, 
        fontWeight: 500
    }
});

export default styles;