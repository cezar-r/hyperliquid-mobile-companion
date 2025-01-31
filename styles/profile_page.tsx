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
        marginTop: 50,
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
        backgroundColor: Colors.RED,
        margin: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
    },
    signOutText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default profileStyles;