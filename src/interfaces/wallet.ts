export interface IOtherCurrency {
    balance: number;
    currency: string;
}

export interface IWallet {
    _id: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
    otherCurrency?: IOtherCurrency;
}