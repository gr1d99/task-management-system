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

export interface ITask {
    id: number;
    token: string;
    assigneeId: number;
    statusId: number;
    name: string
}

export interface ITaskFormValue {
    assigneeId: number;
    name: string
}

export interface ITasksState {

}

export type TLoginResponse = IAuthState
export interface IRegisterPayload {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
}
