import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Token {
    tokenSymbol: string;
    tokenName: string;
}
export type Time = bigint;
export interface TradeEvent {
    action: string;
    network: string;
    walletAddress: string;
    socialHandle: string;
    tokenSymbol: string;
    timestamp: Time;
    tokenName: string;
    priceUSD: number;
    amount: number;
}
export interface backendInterface {
    addToWatchlist(userId: string, symbol: string, name: string): Promise<void>;
    getAllTradeEventsSorted(): Promise<Array<TradeEvent>>;
    getWatchlist(userId: string): Promise<Array<Token>>;
    removeFromWatchlist(userId: string, symbol: string): Promise<void>;
}
