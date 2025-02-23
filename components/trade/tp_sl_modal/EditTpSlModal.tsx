import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import tradeStyles from "../../../styles/trade_page";
import Colors from "../../../styles/colors";
import { calculateProfitLoss } from '../../../common/helpers';

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
        <View style={tradeStyles.modalContainer}>
            <View style={tradeStyles.modalContent}>
                <View style={tradeStyles.tpslHeaderRow}>
                    <Text style={tradeStyles.headerTitle}>
                        TP/SL for Position
                    </Text>
                    <TouchableOpacity 
                        style={tradeStyles.modalClose}
                        onPress={onClose}
                    >
                        <MaterialIcons name="close" size={24} color={Colors.WHITE} />
                    </TouchableOpacity>
                </View>

                <View style={tradeStyles.tpslContainer}>
                    <View style={tradeStyles.tpslRow}>

                    <TextInput
                        style={tradeStyles.priceInput}
                        keyboardType="numeric"
                        value={tpInput}
                        onChangeText={setTpInput}
                        placeholder="TP"
                        placeholderTextColor={Colors.BRIGHT_GREEN}
                    />
                    <Text style={[
                        tradeStyles.profitValue,
                        { color: calculateProfitLoss(tpInput, true, position).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                    ]}>
                        {calculateProfitLoss(tpInput, true, position).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(tpInput, true, position).value).toFixed(2)}
                    </Text>
                    <Text style={[
                        tradeStyles.percentChange,
                        { color: calculateProfitLoss(tpInput, true, position).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                    ]}>
                        {calculateProfitLoss(tpInput, true, position).value >= 0 ? '+' : '-'}{Math.abs(calculateProfitLoss(tpInput, true, position).percent).toFixed(2)}%
                    </Text>
                    </View>

                    <View style={tradeStyles.tpslRow}>

                    <TextInput
                        style={tradeStyles.priceInput}
                        keyboardType="numeric"
                        value={slInput}
                        onChangeText={setSlInput}
                        placeholder="SL"
                        placeholderTextColor={Colors.BRIGHT_GREEN}
                    />
                    <Text style={[
                        tradeStyles.profitValue,
                        { color: calculateProfitLoss(slInput, false, position).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                    ]}>
                        {calculateProfitLoss(slInput, false, position).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(slInput, false, position).value).toFixed(2)}
                    </Text>
                    <Text style={[
                        tradeStyles.percentChange,
                        { color: calculateProfitLoss(slInput, false, position).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                    ]}>
                        {calculateProfitLoss(slInput, false, position).percent.toFixed(2)}%
                    </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={tradeStyles.submitButton}
                    onPress={() => onSubmit(tpInput, slInput)}
                >
                    <Text style={tradeStyles.submitButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}