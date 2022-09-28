import {createSlice} from '@reduxjs/toolkit';

const WalletSlice = createSlice({
    name: "wallet",
    initialState: {
        queryString: ''
    },
    reducers: {
        updateQuery(state, action) {
            state.queryString = action.payload;
        }
    }
})

export const walletActions = WalletSlice.actions;
export default WalletSlice.reducer
