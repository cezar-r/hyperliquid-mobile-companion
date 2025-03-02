import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

const PersistentHeader = () => {
  // Using React.memo to prevent unnecessary re-renders
  return React.memo(() => (
      <Image 
          source={require('../../assets/blob_green.gif')}
          style={styles.header}
      />
  ));
};

export const HeaderComponent = PersistentHeader();
