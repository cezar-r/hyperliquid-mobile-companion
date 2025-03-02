import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import styles from "../styles"
import Colors from "../../../styles/colors";

interface SearchBarProps {
    searchQuery: string,
    onChangeText: (text: string) => void,
    onCloseSearch: () => void,
}

export const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    onChangeText,
    onCloseSearch
}) => {
    return (
        <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color={Colors.BRIGHT_ACCENT}style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={onChangeText}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity 
                    onPress={onCloseSearch}
                    style={styles.clearButton}
                >
                    <AntDesign name="close" size={20}  color={Colors.BRIGHT_ACCENT}/>
                </TouchableOpacity>
            )}
        </View>
    );
}