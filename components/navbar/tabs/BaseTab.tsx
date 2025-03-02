import { Pressable, View } from "react-native";
import { mediumHaptic } from "../../common/HapticTypes";

import styles from "../styles";

type TabBarButtonProps = {
    [key: string]: any;
}

export const TabButton = (props: TabBarButtonProps) => {
    const { children, accessibilityState, onPress } = props;
    const focused = accessibilityState?.selected;
      
    const handlePress = async (e: any) => {
        await mediumHaptic();
        onPress?.(e);
    };
    
    return (
        <Pressable {...props} onPress={handlePress} style={styles.tabButton}>
            <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeLine} />}
                {children}
            </View>
        </Pressable>
    );
};