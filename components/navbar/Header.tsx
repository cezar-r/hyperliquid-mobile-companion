import React from 'react';
import { View } from 'react-native';
import styles from './styles';

// Header component now just provides spacing - GIF is rendered at app level
const HeaderComponent = () => (
    <View style={styles.header} />
);

// Export the memoized singleton instance
export const Header = React.memo(HeaderComponent);
