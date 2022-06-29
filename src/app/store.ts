import { configureStore } from "@reduxjs/toolkit";

import feedPostReducer from '../features/post/feedPostSlice';
import feedCommentReducer from '../features/comment/feedCommentSlice';
import currentUserReducer from "../features/user/currentUserSlice";
import authStateReducer from "../features/user/authStateSlice";
import darkModeReducer from "../features/app/darkModeSlice";

const store = configureStore({
    reducer: {
      feedPost: feedPostReducer,
      feedComment: feedCommentReducer,
      currentUser: currentUserReducer,
      authState: authStateReducer,
      darkMode: darkModeReducer
    },
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store