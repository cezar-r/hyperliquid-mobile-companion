import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../styles/colors";
import styles from "../../styles/constants";

export const Feed = () => (
    <LinearGradient
        colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
        locations={[0, 0.5, .99]}
        start={{ x: .5, y: 0 }}
        end={{ x: .5, y: 1 }}
        style={styles.background}
    >
      <Text style={{color: "white", position: 'absolute', 'top': 180}}>Coming Soon👅👅</Text>
    </LinearGradient>
);

export default Feed;