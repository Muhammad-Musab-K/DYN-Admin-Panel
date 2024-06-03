import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null,
};

export const AuthReducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            state.token = null;
        },
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setToken: (state, { payload }) => {
            state.token = { ...(state.token ? state.token : {}), ...payload }
        }

    },
});

export const { logout, setUser,setToken } = AuthReducer.actions;
export default AuthReducer.reducer;