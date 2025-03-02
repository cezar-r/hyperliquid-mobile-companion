import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  TabNavigator: undefined;
  Trade: { ticker: string };
  Balance: undefined;
  SharePosition: {
    ticker: string;
    entryPrice: number;
    markPrice: number;
    pnlPercent: number;
    pnlValue: number;
    leverage: number;
    isLong: boolean;
  };
};

export type SharePositionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SharePosition'>;