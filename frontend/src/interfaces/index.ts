export interface IUser {
    id: string;
    userName: string;
    email: string;
}

export interface IAuthState {
    accessToken: string | null;
    user: IUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

export interface ITasksState {
    loading: boolean;
    taskCreated: boolean;
    taskUpdated: boolean;
    error: string | null;
    taskList: ITask[],
    statusesList: IStatus[]
}

export interface IUsersState {
    loading: boolean;
    data: IUser[];
}

export interface IPaginationParams {
    page: number;
    limit: number;
}

export interface IPaginatedResponse<T> extends IPaginationParams {
    results: T[];
}

export interface IStatus {
    id: number;
    name: string;
}

export interface ITask {
    id: number;
    token: string;
    description: string;
    assigneeId: number;
    statusId: number;
    title: string;
    status: IStatus;
}

export interface ITaskFormValue {
    token?: string,
    assignee: {
        label: string,
        value: string
    } | null;
    title: string;
    description: string;
    status: {
        label: string,
        value: string
    } | null;
}

export type TLoginResponse = IAuthState
export interface IRegisterPayload {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface ITaskQueryParameters extends IPaginationParams {
    assigneeId?: string;
}

