export interface ICurrency {
    id: string;
    ticker: string;
    primary?: boolean;
    type: string;
    name: string;
    coin_id?: string;
    rates: [];
}