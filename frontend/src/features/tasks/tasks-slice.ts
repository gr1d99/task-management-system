import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import type {
    IPaginatedResponse,
    IStatus,
    ITask,
    ITaskFormValue,
    ITaskQueryParameters,
    ITasksState
} from "../../interfaces";
import {axiosInstance} from "../../api";
import type {RootState} from "../../store";

const initialState: ITasksState = {
    loading: false,
    taskCreated: false,
    taskUpdated: false,
    error: null,
    taskList: [],
    statusesList: [],
}

export const createTaskAsync = createAsyncThunk(
    'tasks/createAsync',
    async (data: ITaskFormValue, {rejectWithValue, dispatch}) => {
        try {
            await axiosInstance.post('/api/v1/tasks', {
                ...data,
                assigneeId: data.assignee?.value,
            });
            dispatch(fetchTasksAsync({page: 1, limit: 1000}));
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchAsync',
    async (params: ITaskQueryParameters, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get<IPaginatedResponse<ITask>>('/api/v1/tasks', {params});

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const fetchTaskStatusesAsync = createAsyncThunk(
    'tasks/statuses/fetchAsync',
    async (params: ITaskQueryParameters, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get<IPaginatedResponse<IStatus>>('/api/v1/statuses', {params});

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const updateTaskAsync = createAsyncThunk(
    'tasks/updateAsync',
    async (data: ITaskFormValue, {rejectWithValue, dispatch}) => {
        try {
            const response = await axiosInstance.put(`/api/v1/tasks/${data.token}`, {
                ...data,
                assigneeId: data.assignee?.value,
                statusId: data.status?.value,
            });

            dispatch(fetchTasksAsync({ page: 1, limit: 1000 }));

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError: (state,) => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(createTaskAsync.pending, (state) => {
            state.loading = true;
        }).addCase(createTaskAsync.fulfilled, (state) => {
            state.taskCreated = true;
            state.loading = false;
        }).addCase(createTaskAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload as string;
        }).addCase(fetchTasksAsync.pending, (state) => {
            state.loading = true;
        }).addCase(fetchTasksAsync.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.taskList = payload.results;
        }).addCase(fetchTasksAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload as string;
        }).addCase(updateTaskAsync.pending, (state) => {
            state.loading = true;
        }).addCase(updateTaskAsync.fulfilled, (state,) => {
            state.loading = false;
            state.taskUpdated = true;
        }).addCase(updateTaskAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload as string;
        }).addCase(fetchTaskStatusesAsync.fulfilled, (state, {payload}) => {
            state.statusesList = payload.results;
        });
    }
})

export const {clearError} = tasksSlice.actions;
export const selectGroupedTasks = createSelector((state: RootState) => state.tasks.taskList,
    (tasks) => {
        const grouped: {
            [key: string]: ITask[];
        } = {};

        for (const task of tasks) {
            const status = task.status;

            if (grouped[status.name]) {
                grouped[status.name].push(task);
            } else {
                grouped[status.name] = [task];
            }
        }

        return grouped;
    })
export const selectStatusesOptions = createSelector((state: RootState) => state.tasks.statusesList,
    (statuses) => {
        return statuses.map(status => ({
            label: status.name,
            value: status.id.toString()
        }))
    });

export default tasksSlice.reducer;
