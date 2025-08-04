import React, { createContext, useContext, useEffect } from 'react';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface AnimationContextType {
  gifRotation: any;
  gifScale: any;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gifRotation = useSharedValue(0);
  const gifScale = useSharedValue(1);

  useEffect(() => {
    // Start persistent animations that will never be interrupted
    gifRotation.value = withRepeat(
      withTiming(0, { duration: 3000 }),
      -1,
      false
    );

    gifScale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  return (
    <AnimationContext.Provider value={{ gifRotation, gifScale }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
};