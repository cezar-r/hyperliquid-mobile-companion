import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import styles from "../styles";
import Colors from "../../../styles/colors";

export enum SortType {
    ALPHABETICAL = 'A-Z',
    VOLUME = '24h Volume',
    CHANGE = '24h Change %',
    FUNDING = 'Funding',
    LEVERAGE = 'Leverage',
    OPEN_INTEREST = 'Open Interest',
}

interface SortHeaderProps {
    currentSort: SortType;
    isAscending: boolean;
    onSortPress: (sortType: SortType) => void;
}

export const SortHeader: React.FC<SortHeaderProps> = ({
    currentSort,
    isAscending,
    onSortPress,
}) => {
    const sortButtons = Object.values(SortType);

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sortHeaderContainer}
        >
            {sortButtons.map((sortType) => (
                <TouchableOpacity
                    key={sortType}
                    style={[
                        styles.sortButton,
                        currentSort === sortType && styles.sortButtonActive
                    ]}
                    onPress={() => onSortPress(sortType)}
                >
                    <Text style={[
                        styles.sortButtonText,
                        currentSort === sortType && styles.sortButtonTextActive
                    ]}>
                        {sortType}
                    </Text>
                    {currentSort === sortType && (
                        <Ionicons 
                            name={isAscending ? "chevron-up" : "chevron-down"} 
                            size={16} 
                            color={Colors.BRIGHT_ACCENT}
                            style={styles.sortIcon}
                        />
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}; 