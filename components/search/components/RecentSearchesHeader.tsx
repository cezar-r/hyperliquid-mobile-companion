import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

import styles from "../styles";
import Colors from "../../../styles/colors";
import { RECENT_SEARCHES_LABEL } from "../constants";

interface RecentSearchesHeaderProps {
    hasRecentSearches: boolean
    onClearRecentSearchesPress: () => void;
}

export const RecentSearchesHeader: React.FC<RecentSearchesHeaderProps> = ({
    hasRecentSearches,
    onClearRecentSearchesPress,
}) => {
    return (
        <View style={styles.recentHeaderContainer}>
            <Text style={styles.sectionTitle}>{RECENT_SEARCHES_LABEL}</Text>
            {hasRecentSearches && (
                <TouchableOpacity 
                    onPress={onClearRecentSearchesPress}
                >
                    <AntDesign name="closecircle" size={15} color={Colors.FG_3} />
                </TouchableOpacity>
            )}
        </View>
    );
}