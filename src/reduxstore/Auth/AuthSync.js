import { createAsyncThunk } from "@reduxjs/toolkit"
import { callApi } from "../api"
// import { asyncShowError, asyncShowSuccess } from "../Users/UsersSlice"
import { setToken, setUser } from "./AuthSlice"

export const asyncLogin = createAsyncThunk(
    "auth/login",
    async (body, { dispatch }) => {
        // console.log(body, 'body in login')
        try {
            const res = await callApi({
                path: `api/v1/auth/login`,
                method: "POST",
                body,
            })
            console.log(res)
            if (res.success) {
                // dispatch(setUser({ user: res.data, token: [res.accessToken, res.refreshToken] }))
                const { user, ...rest } = res.data
                dispatch(setUser(user))
                dispatch(setToken(rest))
                // dispatch(
                //     asyncShowSuccess({ message: "Login", description: res.message })
                // )
                return res
            } else if (res.success === false) {
                // dispatch(asyncShowError({ message: "Login", description: res.error }))
                console.log(res)
                return res
            }
            return res
        } catch (error) {
            // dispatch(asyncShowError({ message: "Login", description: error.message }))
            console.log(error)
            // dispatch(asyncShowError(error.message));
            return { success: false }
        }
    }
)
