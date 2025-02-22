import { StyleSheet } from "react-native";

import { Colors } from "./colors";


export const styles = StyleSheet.create({
    tabButton: {
            flex: 1,
            alignItems: 'center',
        },
        tabIconContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        activeLine: {
            position: 'absolute',
            top: -4,
            width: '67%',
            height: 3,
            backgroundColor: Colors.BRIGHT_GREEN,
            borderRadius: 3,
        }
});