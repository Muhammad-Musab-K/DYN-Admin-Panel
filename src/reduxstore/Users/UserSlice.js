import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    page: 1,
    totalPage: 1,
    next: false,
    prev: false,

}

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setAllUsers(state, { payload }) {
            state.users = payload
        },
        setPagination: (state, action) => {
            const { page, totalPages, next, prev } = action.payload;
            state.page = page;
            state.totalPage = totalPages;
            state.next = next;
            state.prev = prev;
        },
        nextPage: (state) => {
            if (state.next) {
                state.page = state.page + 1;
            }
        },
        prevPage: (state) => {
            if (state.prev) {
                state.page = state.page - 1;
            }

        },
    }
})


export const UserState = createDraftSafeSelector(
    [state => state.users.users],
    (users) => users
)


export const { setAllUsers, setPagination, nextPage, prevPage } = UserSlice.actions
export default UserSlice.reducer