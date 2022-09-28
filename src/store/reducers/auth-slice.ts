import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        isAuth: false
    },
    reducers: {
        setUser(state, data) {
            state.user = data.payload
        },
        setAuth(state, data) {
            state.isAuth = data.payload
        }
    }
})

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer