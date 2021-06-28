import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
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

    useEffect(() => {
        const { 'jwtauth.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response=> {
                const { email, permissions, roles } = response.data

                setUser({ email, permissions, roles })
            })
        }
    }, [])
    
    async function signIn ({ email, password }:SignInCredentials) {
        try {
            const response = await api.post('sessions', {
                email, 
                password
            })

            const { token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'jwtauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,   // 30 dias
                path: '/'
            })

            setCookie(undefined, 'jwtauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,   // 30 dias
                path: '/'
            })

            setUser({
                email,
                permissions,
                roles,
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
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