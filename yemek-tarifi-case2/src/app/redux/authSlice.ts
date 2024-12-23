import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: any;
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthFromLocalStorage(state) {

            const user = localStorage.getItem('user');
            const token = localStorage.getItem('authToken');

            if (user && token) {
                state.isAuthenticated = true;
                state.user = JSON.parse(user);
            } else {
                state.isAuthenticated = false;
                state.user = null;
            }
        },
        login(state, action: PayloadAction<any>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});


export const { setAuthFromLocalStorage, login, logout } = authSlice.actions;


export default authSlice.reducer;
