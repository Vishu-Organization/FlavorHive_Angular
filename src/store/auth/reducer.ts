import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess } from "./actions";
import { IToken } from "src/app/types/token";

export interface AuthState {
    token: IToken| null;
    error: string | null;
    loading: boolean;
}

export const initialState: AuthState = {
    token: null,
    error: null,
    loading: false
}

export const authReducer = createReducer(
    initialState,
    on(login, (state) => ({ ...state, loading: true, error: null })),
    on(loginSuccess, (state, { token }) => ({
        ...state, token, loading: false })),
    on(loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(logout, (state) => ({ ...state, loading: true, error: null })),
    on(logoutSuccess, () => initialState),
    on(logoutFailure, (state, { error }) => ({ ...state, error, loading: false }))
)