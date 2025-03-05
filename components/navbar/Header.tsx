import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

// Create a singleton instance of the header component
const HeaderComponent = () => (
    <Image 
        source={require('../../assets/blob_green.gif')}
        style={styles.header}
    />
);

// Export the memoized singleton instance
export const Header = React.memo(HeaderComponent);
