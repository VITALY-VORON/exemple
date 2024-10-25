import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user.slice';
import nodeReducer from "./reducers/node.slice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        node: nodeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;