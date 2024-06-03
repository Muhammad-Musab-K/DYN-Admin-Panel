import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    pageP: 1,
    totalPageP: 1,
    nextP: false,
    prevP: false,
}

const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setAllPosts(state, { payload }) {
            state.posts = payload
        },
        setPagination: (state, { payload }) => {
            const { page, totalPage, next, prev } = payload;
            state.pageP = page;
            state.totalPageP = totalPage;
            state.nextP = next;
            state.prevP = prev;
        },
        nextPage: (state) => {
            if (state.nextP) {
                state.pageP = state.pageP + 1;
            }
        },
        prevPage: (state) => {
            if (state.prevP) {
                state.pageP = state.pageP - 1;
            }
        },
    },
});

export const PostState = createDraftSafeSelector(
    state => state.posts.posts,
    (posts) => posts
);

export const multimedia = createDraftSafeSelector(
    [PostState],
    (posts) => posts.map(item => item?.multiMedia)
);

// export const postOwner = createDraftSafeSelector(
//     [PostState], (PostState) => PostState.user
// );

export const { setAllPosts, setPagination, nextPage, prevPage } = PostSlice.actions;
export default PostSlice.reducer;
