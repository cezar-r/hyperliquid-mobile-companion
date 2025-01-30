import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserState } from '../services/hyperliquid/get_user_state.cjs';
import { getPerpsMeta } from '../services/hyperliquid/get_perps_meta.cjs';
import { UserState, PerpsMeta } from '../common/types';

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
    const [globalState, setGlobalState] = useState<GlobalState>({
        userState: null,
        perpsMeta: null,
        lastUpdated: null
    });

    const updateGlobalState = async () => {
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
            console.error('Error updating global state:', error);
        }
    };

    // Initial load and setup interval
    useEffect(() => {
        updateGlobalState();
        const interval = setInterval(updateGlobalState, 10000);
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