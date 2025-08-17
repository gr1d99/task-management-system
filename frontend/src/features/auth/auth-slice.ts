import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {IAuthState, TLoginResponse, IRegisterPayload} from "../../interfaces";
import {axiosInstance} from "../../api";
import {getItem, removeItem, storeItem} from "../../utils/local-storage-utils.ts";

const initialState: IAuthState = {
    accessToken: null,
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null
}

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<TLoginResponse>('/api/v1/auth/login', credentials);

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const registerAsync = createAsyncThunk(
    'auth/registerAsync',
    async (data: IRegisterPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<TLoginResponse>('/api/v1/auth/registrations', data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshAuth: (state,) => {
            const accessToken = getItem<string>('accessToken')

            if (accessToken.value) {
                state.accessToken = accessToken.value
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
            removeItem('accessToken');
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: builder => {
        builder.addCase(loginAsync.pending, (state) => {
            state.loading = true;
        }).addCase(loginAsync.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.accessToken = payload.accessToken;
            state.error = null;
            state.isAuthenticated = true;
            storeItem('accessToken', payload.accessToken!);
        }).addCase(loginAsync.rejected, (state, { payload }) => {
            state.error = payload as string;
            state.loading = false;
        }).addCase(registerAsync.pending, (state,) => {
            state.loading = true;
        }).addCase(registerAsync.rejected, (state, { payload }) => {
            state.error = payload as string;
        }).addCase(registerAsync.fulfilled, (state,) => {
            state.loading = false;
        })
    }
})

export const { logout, refreshAuth } = authSlice.actions

export default authSlice.reducer
