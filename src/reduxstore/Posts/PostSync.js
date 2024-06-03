import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllPosts, setPagination } from "./PostSlice";
import { callApi } from "../api"

export const getAllPosts = createAsyncThunk(
    "getAllPosts", async ({ pageP }, { getState, dispatch }) => {
        try {

            const response = await callApi({
                path: `api/v1/post/posts?page=${pageP}`,
                method: "GET",
                token: getState().login.token.accessToken
            })
            if (response) {
                dispatch(setAllPosts(response.data.posts))
                dispatch(setPagination(response.data))
                return response.data
            }
        } catch (err) {
            console.log(err.message)
        }
    }
)