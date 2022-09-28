import {walletActions} from "../reducers/wallet-slice";

export const fetchWallets = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch(
                'https://react-http-6b4a6.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not fetch wallets!');
            }

            return await response.json();
        };

        try {
            const cartData = await fetchData();

            dispatch(
                walletActions.replaceWallets({
                    wallets: cartData || [],
                })
            );
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchWalletTransaction = () => {
    return async (dispatch) => {

    }
}