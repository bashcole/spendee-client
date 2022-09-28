import { createSlice } from '@reduxjs/toolkit';

const UISlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: true,
        isMenuOpen: false,
        showTransactionDialog: false,
        showQRDialog: false,
        navItems: []
    },
    reducers: {
        showTransactionDialog(state) {
            state.showTransactionDialog = true
        },
        hideTransactionDialog(state) {
            state.showTransactionDialog = false
        },
        toggleTransactionDialog(state) {
            state.showTransactionDialog = !state.showTransactionDialog
        },
        showQRDialog(state) {
            state.showQRDialog = true
        },
        hideQRDialog(state) {
            state.showQRDialog = false
        },
        toggleQRDialog(state) {
            state.showQRDialog = !state.showQRDialog
        },
        openMenu(state){
          state.isMenuOpen = true
        },
        hideMenu(state){
            state.isMenuOpen = false
        },
        toggleMenu(state){
          state.isMenuOpen = !state.isMenuOpen
        },
        setNavItems(state, data) {
            state.navItems = data.payload
        },
        setIsLoading(state, data) {
            state.isLoading = data.payload
        }
    }
})

export const uiActions = UISlice.actions;
export default UISlice.reducer