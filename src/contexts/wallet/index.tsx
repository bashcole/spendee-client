import {createContext} from "react";
import {ITransactionCategory} from "@interfaces/category";
import {IWallet} from "@interfaces/wallet";
import {ICurrency} from "@interfaces/currency";

interface AppContextInterface {
    wallet?: IWallet | undefined;
    categories?: ITransactionCategory[] | undefined;
    currencies?: ICurrency[] | undefined;
}

export const WalletContextDefaultState = {
    categories: undefined,
    currencies: undefined,
    wallet: undefined
}

export default createContext<AppContextInterface>(WalletContextDefaultState)