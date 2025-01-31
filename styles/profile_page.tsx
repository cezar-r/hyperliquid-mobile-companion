import { Colors } from './colors';
import { StyleSheet } from 'react-native';


const profileStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_DARK_GREEN,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    field: {
        padding: 20,
        gap: 8,
    },
    credContainer: {
        marginTop: 20,
        marginBottom: 80,
    },
    label: {
        color: Colors.WHITE,
        fontSize: 16,
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
    value: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    signOutButton: {
        backgroundColor: Colors.BRIGHT_GREEN,
        margin: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
        position: 'absolute',
        bottom: 120,
    },
    signOutText: {
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default profileStyles;