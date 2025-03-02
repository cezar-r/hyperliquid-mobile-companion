import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from "../../styles";
import Colors from "../../../../styles/colors";
import { calculateProfitLoss } from '../../../../common/helpers';

interface EditTpSlModalProps {
    position: any;
    initialTpInput: string;
    initialSlInput: string;
    onClose: () => void;
    onSubmit: (tpInput: string, slInput: string) => void;
}

export const EditTpSlModal: React.FC<EditTpSlModalProps> = ({
    position,
    initialTpInput,
    initialSlInput,
    onClose,
    onSubmit,
}) => {
    const [tpInput, setTpInput] = useState(initialTpInput);
    const [slInput, setSlInput] = useState(initialSlInput);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.tpslHeaderRow}>
                    <Text style={styles.headerTitle}>
                        TP/SL for Position
                    </Text>
                    <TouchableOpacity 
                        style={styles.modalClose}
                        onPress={onClose}
                    >
                        <MaterialIcons name="close" size={24} color={Colors.FG_1} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tpslContainer}>
                    <View style={styles.tpslRow}>

                    <TextInput
                        style={styles.priceInput}
                        keyboardType="numeric"
                        value={tpInput}
                        onChangeText={setTpInput}
                        placeholder="TP"
                        placeholderTextColor={Colors.BRIGHT_ACCENT}
                    />
                    <Text style={[
                        styles.profitValue,
                        { color: calculateProfitLoss(tpInput, true, position).value >= 0 ? Colors.BRIGHT_ACCENT : Colors.RED }
                    ]}>
                        {calculateProfitLoss(tpInput, true, position).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(tpInput, true, position).value).toFixed(2)}
                    </Text>
                    <Text style={[
                        styles.percentChange,
                        { color: calculateProfitLoss(tpInput, true, position).value >= 0 ? Colors.BRIGHT_ACCENT : Colors.RED }
                    ]}>
                        {calculateProfitLoss(tpInput, true, position).value >= 0 ? '+' : '-'}{Math.abs(calculateProfitLoss(tpInput, true, position).percent).toFixed(2)}%
                    </Text>
                    </View>

                    <View style={styles.tpslRow}>

                    <TextInput
                        style={styles.priceInput}
                        keyboardType="numeric"
                        value={slInput}
                        onChangeText={setSlInput}
                        placeholder="SL"
                        placeholderTextColor={Colors.BRIGHT_ACCENT}
                    />
                    <Text style={[
                        styles.profitValue,
                        { color: calculateProfitLoss(slInput, false, position).value >= 0 ? Colors.BRIGHT_ACCENT : Colors.RED }
                    ]}>
                        {calculateProfitLoss(slInput, false, position).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(slInput, false, position).value).toFixed(2)}
                    </Text>
                    <Text style={[
                        styles.percentChange,
                        { color: calculateProfitLoss(slInput, false, position).value >= 0 ? Colors.BRIGHT_ACCENT : Colors.RED }
                    ]}>
                        {calculateProfitLoss(slInput, false, position).percent.toFixed(2)}%
                    </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => onSubmit(tpInput, slInput)}
                >
                    <Text style={styles.submitButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}