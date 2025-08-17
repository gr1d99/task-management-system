import {createAsyncThunk, createSlice, createSelector} from '@reduxjs/toolkit'
import type {IUsersState, IUser, IPaginatedResponse} from "../../interfaces";
import {axiosInstance} from "../../api";
import type {RootState} from "../../store";

const initialState: IUsersState = {
    loading: false,
    data: []
}

export const fetchUsersAsync = createAsyncThunk(
    'users/fetchAsync',
    async (params: { page: number, limit: number }, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get<IPaginatedResponse<IUser>>('/api/v1/users', {params});

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsersAsync.pending, (state) => {
            state.loading = true;
        }).addCase(fetchUsersAsync.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.data = payload.results;
        }).addCase(fetchUsersAsync.rejected, (state) => {
            state.loading = false;
        });
    }
})


export default usersSlice.reducer
export const selectUsersOptions = createSelector((state: RootState) => state.users.data,
    (users) => {
        return users.map(user => ({
            label: user.email,
            value: user.id
        }))
    });
