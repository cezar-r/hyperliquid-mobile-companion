import { StyleSheet } from 'react-native';
import Colors from "./colors";

export const balanceStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_DARK_GREEN,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    backArrow: {
        color: Colors.BRIGHT_GREEN,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphPlaceholder: {
        // Add styling for graph container
        height: 200,  // Adjust as needed
    },
    ordersContainer: {
        // Add styling for orders section
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 50,  // Add padding at the bottom
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.DARK_DARK_GREEN,
        marginVertical: 10,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        borderColor: Colors.BRIGHT_GREEN,
        borderWidth: 1,
    },
    buttonText: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 16,
        fontWeight: '600',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
    },
    buttonIcon: {
        marginHorizontal: 4,
    },
});

export default balanceStyles;