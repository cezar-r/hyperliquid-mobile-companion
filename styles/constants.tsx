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
    input: {
        backgroundColor: Colors.GRAY,
        color: Colors.WHITE,
        padding: 15,
        borderRadius: 5,
        paddingRight: 70,
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
        backgroundColor: Colors.GRAY,
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonActive: {
        backgroundColor: Colors.BRIGHT_GREEN,
    },
    submitButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default styles;
