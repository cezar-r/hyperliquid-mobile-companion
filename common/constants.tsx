import Home from "../components/home/Home";

export const NAVBAR_HEIGHT = 80;

export const Pages = {
    HOME: 'Home',
    HISTORY: 'History',
    SEARCH: 'Search',
    X_FEED: 'X Feed',
    PROFILE: 'Profile',
    TRADE: 'Trade',
    BALANCE: 'Balance',
    SHARE_POSITION: 'SharePosition',
}

export const GIF_LOGO = {
    source: "../assets/blob_green.gif",
    size: 50,
}

export enum LocalStorageKey {
    ADDRESS = "address",
    SECRET = "secretKey",
    RECENT_SEARCHES = 'recentSearches',
}

export enum PageName {
    MAIN_APP_PAGE = "MainApp",
    SPLASH_PAGE = "Splash",
    ONBOARDING = "Onboarding",
    TRADE = "Trade",
}

export enum FieldLabels {
    WALLET_ADDRESS = "Wallet Address",
    SECRET_KEY = "Secret Key"
}