import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/onboarding';
import { CONNECT_BUTTON_TEXT } from '../constants';

interface ConnectButtonProps {
    validForm: boolean,
    handleSubmit: () => void
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
    validForm,
    handleSubmit
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.submitButton,
                validForm ? styles.submitButtonActive : null
            ]}
            onPress={handleSubmit}
            disabled={!validForm}
        >
            <Text style={styles.submitButtonText}>{CONNECT_BUTTON_TEXT}</Text>
        </TouchableOpacity>
    )
}