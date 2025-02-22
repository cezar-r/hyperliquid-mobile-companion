import { StyleSheet } from 'react-native';

import { Colors } from "./colors";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.DARK_DARK_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    p_text: {
        color: Colors.WHITE,
        fontSize: 12
    },
    inputContainer: {
        width: '80%',
        marginVertical: 10,
        position: 'relative',
    },
    logoText: {
        fontWeight: 200,
        color: Colors.WHITE,
        marginBottom: 80,
        fontSize: 42,
    },
    input: {
        backgroundColor: Colors.DARK_DARK_GREEN,
        color: Colors.WHITE,
        padding: 15,
        borderRadius: 5,
        paddingRight: 70,
        borderWidth: 2,
        borderColor: Colors.BRIGHT_GREEN
    },
    pasteButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{translateY: -12}],
        padding: 5,
    },
    pasteButtonText: {
        color: Colors.BRIGHT_GREEN,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: Colors.GREEN,
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 180,
    },
    submitButtonActive: {
        backgroundColor: Colors.BRIGHT_GREEN,
    },
    submitButtonText: {
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default styles;
