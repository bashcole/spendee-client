import {privateRequest} from "../services/axios";
import {IWallet} from "@interfaces/wallet";
import {ITransaction} from "@interfaces/transaction";
import {IPosition} from "@interfaces/position";
import {ITransactionCategory} from "@interfaces/category";
import {ICurrency} from "@interfaces/currency";

export const formatNumber = (value: number, locale: string = 'en', currency: string = 'USD'): string => {
    return `${value.toLocaleString(locale === 'en' ? 'en-US' : 'bg-BG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${currency}`
}

export const timeSince = (date: Date) => {

    let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export const dateToYMD = (date: Date) => {
    const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = date.getDate();
    const m = strArray[date.getMonth()];
    const y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

export const dateToMY = (date: Date) => {
    const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const m = strArray[date.getMonth()];
    const y = date.getFullYear();
    return m + ' ' + y;
}

export const dateFormat = (date: Date, locale: string = 'en') => {
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'bg-BG', {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}
export const dateToYMDShort = (date: Date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

export const privateFetcher = {
    get: (url: string) => privateRequest.get(url).then(res => res.data)
}

export const calculateWalletTotalBalance = (wallets: IWallet[]) => {
    // @ts-ignore
    return wallets.reduce((previousValue: number, currentValue: IWallet) => previousValue + (currentValue.currency !== "BGN" ? currentValue.otherCurrency.balance : currentValue.balance), 0)
}

export const formatWalletBalance = (balance: number, currency: string, locale: string = 'en') => {
    return formatNumber(balance / 100, locale, currency)
}

export const formatWalletBalanceWithSign = (balance: number, currency: string, locale: string = 'en') => {
    return `${formatNumber(balance / 100, locale, currency)}`
}

export const isBalanceNegative = (balance: number) => {
    return balance < 0
}

export const findIncomeTransactions = (transactions: ITransaction[]) => {
    return transactions.filter((item: ITransaction) => item.category.type === 'income')
}

export const findExpenseTransactions = (transactions: ITransaction[]) => {
    return transactions.filter((item: ITransaction) => item.category.type === 'expense')
}

export const calculateTransactionsTotal = (transactions: ITransaction[]): number => {
    return transactions.reduce((previousValue: number, currentValue: ITransaction) => previousValue + currentValue.amount, 0)
}

export const calculateTotalIncome = (transactions: ITransaction[]): number => {
    return calculateTransactionsTotal(findIncomeTransactions(transactions))
}

export const calculateTotalExpense = (transactions: ITransaction[]) => {
    return calculateTransactionsTotal(findExpenseTransactions(transactions))
}

export const sumTransactions = (transactions: ITransaction[]) => {
    return transactions.reduce(
        (previousValue, currentValue) => previousValue + (currentValue['amount'] / 100) * (currentValue.category.type === "expense" ? -1 : 1),
        0)
}

export const sumOtherTransactions = (transactions: ITransaction[]) => {
    return transactions.reduce(
        (previousValue, currentValue) => previousValue + (currentValue['otherCurrency']['amount'] / 100) * (currentValue.category.type === "expense" ? -1 : 1),
        0)
}

export const sumPositions = (positions: IPosition[]) => {
    return positions.reduce(
        (previousValue, currentValue) => previousValue + (currentValue['amount']['value']),
        0)
}

interface IWalletData {
    name: string;
    currency: string;
    type: string;
    other_currency: string;
}

export const createWallet = async (data: IWalletData) => {

    let object = {
        name: data.name,
        currency: data.currency,
        balance: 0,
        type: data.type,
    }

    if (data.other_currency) {
        // @ts-ignore
        object = {...object, otherCurrency: {balance: 0, currency: data.other_currency}}
    }

    return await privateRequest.post('/wallets/create', object)
}

export const editWallet = async (id: string, data: object) => {
    await privateRequest.patch(`/wallets/${id}`, data)
}

export const deleteWallet = async (id: string) => {
    return await privateRequest.delete(`/wallets/${id}`)
}

export interface ITransactionData {
    amount: string;
    category: ITransactionCategory;
    note?: string;
    walletID: string;
    currency: string;
    createdAt: Date;
    otherCurrency?: any
}

export interface IPositionData {
    units: number;
    open: number;
    walletID: string;
    currency: string;
    createdAt: Date;
}

export const createPosition = async (data: IPositionData) => {
    return await privateRequest.post('/positions/create', data)
}

export const editPosition = async (data: IPositionData, id: string) => {
    return await privateRequest.put(`positions/${id}`, data)
}

export const deletePosition = async(id: string) => {
    return await privateRequest.delete(`positions/${id}`)
}

export const deleteTransaction = async(id: string) => {
    return await privateRequest.delete(`transactions/${id}`)
}

export const createTransaction = async (data: ITransactionData) => {
    return await privateRequest.post('/transactions/create', data)
}

export const editTransaction = async (data: ITransactionData, id: string) => {
    return await privateRequest.put(`transactions/${id}`, data)
}

export const toQueryString = (object: Object | undefined) => {

    if(object == null) return ''
    return '?' +
        Object.keys(object!)
            .map(key => {
                // @ts-ignore
                return `${key}=${encodeURIComponent(object![key])}`;
            })
            .join('&');
}

export const portfolioCurrencies = (currencies: ICurrency[] | undefined ) => {
    if(currencies === undefined) return []
    return currencies.filter(currency => currency.type !== 'fiat')
}