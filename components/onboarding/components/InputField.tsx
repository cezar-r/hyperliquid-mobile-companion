import React from 'react';
import { View, TextInput } from 'react-native';
import Colors from '../../../styles/colors';
import styles from '../../../styles/onboarding';
import { PasteButton } from './PasteButton';

interface InputFieldProps {
    placeholderText: string;
    value: string;
    setValue: (text: string) => void;
    onPastePress: () => void;
}

export const InputFieldWithPaste: React.FC<InputFieldProps> = ({
    placeholderText,
    value,
    setValue,
    onPastePress,
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder={placeholderText}
                placeholderTextColor={Colors.WHITE}
                value={value}
                onChangeText={setValue}
            />
            <PasteButton onPress={onPastePress} />
        </View>
    );
}
