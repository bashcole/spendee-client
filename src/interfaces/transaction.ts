import {ITransactionCategory} from "./category";

export interface IOtherCurrency {
    amount: number;
    currency: string;
}

export interface ITransaction {
    _id: string;
    note: string;
    amount: number;
    date: string;
    createdAt: string;
    currency: string;
    category: ITransactionCategory;
    otherCurrency: IOtherCurrency;
}

export interface IQRData {
    amount: any;
    date: any;
}
