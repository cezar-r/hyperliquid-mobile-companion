import { StyleSheet } from 'react-native';
import Colors from "../../../styles/colors";

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
        color: Colors.FG_1, 
        marginRight: 8
    },

    background: {
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: 'transparent'
    },

    loading: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    tickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 180,
        marginBottom: 20,
    },

    tickerLabel: {
        fontSize: 30,
        color: Colors.FG_1,
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
        color: Colors.FG_3,
        marginBottom: 10
    },

    value: {
       fontSize: 16,
        color: Colors.FG_1,
        fontWeight: 600,
        marginBottom: 10 
    },

    urlContainer: {
        marginTop: 15, 
    },

    urlText: {
        color: Colors.BRIGHT_ACCENT, 
        fontWeight: 500
    },

    button: {
        backgroundColor: Colors.BRIGHT_ACCENT,
        paddingVertical: 16,
        marginHorizontal: 20,
        marginBottom: 40,
        borderRadius: 5,
        alignItems: 'center'
    },

    buttonLabel: {
        color: Colors.BG_1,
        fontSize: 16,
        fontWeight: 600
    }
});

export default styles;