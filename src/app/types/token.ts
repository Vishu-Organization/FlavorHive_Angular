export interface IToken {
    token: string | null;
    expiresIn: number | null;
    expiresAt: number | null;
    refreshToken: string | null;
    user: IUser | null;
}

export interface IUser {
    email: string;
    name: string;
    id: string
}

export interface ILoginResponse {
    access_token: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: {
        id: string;
        user_metadata: {
            email: string;
            name: string;
        }
    }
}