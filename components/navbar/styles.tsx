import { StyleSheet } from "react-native";

import { Colors } from "../../styles/colors";
import { NAVBAR_HEIGHT } from "../../common/constants";

const styles = StyleSheet.create({
    header:{
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
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
        backgroundColor: Colors.BRIGHT_ACCENT,
        borderRadius: 3,
    },
    tabBarStyle: {
        backgroundColor: Colors.BG_2,
        borderTopWidth: 1,
        borderTopColor: Colors.BG_1,
        height: NAVBAR_HEIGHT,
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
        paddingBottom: 25,
        paddingTop: 4,
    },
    headerStyle: {
        backgroundColor: Colors.BG_3,
        borderBottomWidth: 1,
        height: 100,
        borderBottomColor: Colors.BG_1,
        shadowOpacity: 0,
        elevation: 0,
    },
});

export default styles;