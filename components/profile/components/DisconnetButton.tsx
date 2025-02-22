import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../../../styles/profile_page';
import { DISCONNECT_BUTTON_TEXT } from '../constants';

interface DisconnectButtonProps {
    handleSignOut: () => void
}

export const DisonnectButton: React.FC<DisconnectButtonProps> = ({
    handleSignOut
}) => {
    return (
        <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={handleSignOut}
        >
            <Text style={styles.signOutText}>{DISCONNECT_BUTTON_TEXT}</Text>
        </TouchableOpacity>
    )
}