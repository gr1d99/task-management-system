import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "../features/tasks/tasks-slice.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from "../features/auth/auth-slice.ts";
import usersReducer from "../features/users/users-slice.ts";
import notificationReducer from "../features/alerts/notification-slice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        users: usersReducer,
        notification: notificationReducer
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
