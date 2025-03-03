import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserState } from '../services/hyperliquid/get_user_state.cjs';
import { getPerpsMeta } from '../services/hyperliquid/get_perps_meta.cjs';
import { UserState, PerpsMeta } from '../common/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHyperliquidWSClient } from '../services/hyperliquid/get_hl_ws_client.cjs';
import { Hyperliquid } from 'hyperliquid/dist';
import { LocalStorageKey } from '../common/constants';

interface GlobalState {
    userState: UserState | null;
    perpsMeta: PerpsMeta | null;
    lastUpdated: number | null;
}

interface GlobalContextType {
    globalState: GlobalState;
    refreshData: () => Promise<void>;
}

const GlobalStateContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState("");
    const [globalState, setGlobalState] = useState<GlobalState>({
        userState: null,
        perpsMeta: null,
        lastUpdated: null
    });

    const initalizeAddress = async () => {
        const storageAddress = await AsyncStorage.getItem(LocalStorageKey.ADDRESS);
        if (storageAddress) {
            setAddress(storageAddress);
        }
    }

    const updateGlobalState = async () => {
        if (address === "") {
            return;
        }
        try {
            const [userState, perpsMeta] = await Promise.all([
                getUserState(),
                getPerpsMeta()
            ]);

            setGlobalState({
                userState,
                perpsMeta,
                lastUpdated: Date.now()
            });

        } catch (error) {
            return;
        }
    };


    // Initial load and setup interval
    useEffect(() => {
        initalizeAddress();
        updateGlobalState();
        const interval = setInterval(updateGlobalState, 4100);
        return () => clearInterval(interval);
    }, []);

    const refreshData = async () => {
        await updateGlobalState();
    };

    return (
        <GlobalStateContext.Provider value={{ globalState, refreshData }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};