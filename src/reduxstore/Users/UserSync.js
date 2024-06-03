import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllUsers } from "./UserSlice";
import { setPagination } from "./UserSlice";
import { callApi } from "../api"

//get All Users

export const getAllUsers = createAsyncThunk(
    "getAllUsers", async ({ page }, { getState, dispatch }) => {
        try {
            const response = await callApi({
                path: `api/v1/users?page=${page}`,
                method: "GET",
                token: getState().login.token.accessToken,
            })
            if (response) {
                dispatch(setAllUsers(response.data.users))
                dispatch(setPagination(response.data))
                return response.data
            }
        } catch (err) {
            console.log(err.message)
        }
    }
)