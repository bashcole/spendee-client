import { createSlice } from '@reduxjs/toolkit';

const TransactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        QRData: null
    },
    reducers: {
        setQRData(state, data) {
            state.QRData = data.payload
        },
    }
})
export const transactionActions = TransactionsSlice.actions;
export default TransactionsSlice.reducer