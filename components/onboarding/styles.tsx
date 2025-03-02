import { StyleSheet } from 'react-native';

import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.BG_3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    p_text: {
        color: Colors.FG_1,
        fontSize: 12
    },
    inputContainer: {
        width: '80%',
        marginVertical: 10,
        position: 'relative',
    },
    logoText: {
        fontWeight: 200,
        color: Colors.FG_1,
        marginBottom: 80,
        fontSize: 42,
    },
    input: {
        backgroundColor: Colors.BG_3,
        color: Colors.FG_1,
        padding: 15,
        borderRadius: 5,
        paddingRight: 70,
        borderWidth: 2,
        borderColor: Colors.BRIGHT_ACCENT
    },
    pasteButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{translateY: -12}],
        padding: 5,
    },
    pasteButtonText: {
        color: Colors.BRIGHT_ACCENT,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: Colors.ACCENT,
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 180,
    },
    submitButtonActive: {
        backgroundColor: Colors.BRIGHT_ACCENT,
    },
    submitButtonText: {
        color: Colors.BG_1,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default styles;
