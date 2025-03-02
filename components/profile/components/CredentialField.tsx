import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

import styles from '../styles';
import { Colors } from '../../../styles/colors';
import { CopyButtonIcon } from '../../common/icons/CopyButtonIcon';

interface AddressFieldProps {
    onPress: () => void
    label: string,
    value: string
}

export const CredentialField: React.FC<AddressFieldProps> = ({
    onPress,
    label,
    value
}) => {
    return (
        <View style={styles.field}>
            <View style={styles.box}>
                <Text style={styles.boxLabel}>{label}</Text>
                <View style={styles.containerRightSide}>
                    <Text style={styles.value}>
                        {value}
                    </Text>
                    <TouchableOpacity 
                        onPress={onPress}
                        style={styles.copyButton}
                    >
                        <CopyButtonIcon/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}