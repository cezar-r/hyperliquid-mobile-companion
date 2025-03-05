export interface UserState {
    spot: any,
    perps: any,
}

export interface PerpsMeta {
    perpsMeta: any,
}

export interface TickerData {
    maxLev: number;
    volume24h: number;
    ticker: string;
    szDecimals: number;
    price: number;
    funding: number;
    prevDayPx: number;
    openInterest: number;
}