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
        initLogin: state => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.user = payload.user;
            state.loading = false;
            state.error = null;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        loginFailure: (state, { payload }) => {
            state.loading = false
            state.error = payload
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

// Export the generated action creators for use in components
export const { initLogin, loginSuccess, loginFailure, logout, clearError, refreshAuth } = authSlice.actions

// Export the slice reducer for use in the store configuration
export default authSlice.reducer
