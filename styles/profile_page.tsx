import { Colors } from './colors';
import { StyleSheet } from 'react-native';


const profileStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_DARK_GREEN,
        alignItems: 'center',
    },
    field: {
        paddingHorizontal: 18,
        paddingVertical: 13,
    },
    credContainer: {
        marginTop: 20,
        marginBottom: 80,
        width: '100%',
    },
    box: {
        backgroundColor: Colors.BLACK,
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    boxLabel: {
        color: Colors.LIGHT_GRAY,
        fontSize: 15,
    },
    value: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 600,
    },
    copyButton: {
        padding: 4,
    },
    signOutButton: {
        backgroundColor: Colors.BRIGHT_GREEN,
        margin: 20,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        position: 'absolute',
        bottom: 100,
    },
    signOutText: {
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerRightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    }
});

export default profileStyles;