import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from "./notifications/notifications.slice"
// ...

export const awesomeStore = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof awesomeStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof awesomeStore.dispatch