import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credential): Promise<void>;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;
    
    async function signIn ({ email, password }:SignInCredentials) {
        try {
            const response = await api.post('sessions', {
                email, 
                password
            })

            const { token, refreshToken, permissions, roles } = response.data;

            setUser({
                email,
                permissions,
                roles,
            })
            Router.push('/authneeded');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            { children }
        </AuthContext.Provider>
    )
}