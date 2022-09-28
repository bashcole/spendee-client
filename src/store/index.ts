import {configureStore} from '@reduxjs/toolkit';
import UiSlice from "./reducers/ui-slice";
import AuthSlice from "./reducers/auth-slice";
import TransactionsSlice from "@store/reducers/transactions-slice";
import WalletSlice from "@store/reducers/wallet-slice";
import {IUser} from "@interfaces/user";

const store = configureStore({
    reducer: {auth: AuthSlice, ui: UiSlice, wallet: WalletSlice},
});

export interface INavItem {
    name: string;
    url: string;
    active?: boolean;
}

export interface IRootStore {
    auth: {
        user: IUser;
        isAuth: boolean
    },
    ui: {
        isLoading: boolean,
        isMenuOpen: boolean,
        showTransactionDialog: boolean;
        showQRDialog: boolean;
        navItems: INavItem[]
    },
    transactions: {
        QRData?: object
    },
    wallet: {
        queryString: string
    }
}

export default store;