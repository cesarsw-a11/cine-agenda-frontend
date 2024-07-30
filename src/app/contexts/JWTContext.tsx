'use client'
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from '../utils/axios';
import { setSession, isValidToken } from '../utils/jwt';
import { useRouter } from 'next/navigation'

interface AuthContextProps {
    user: string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, name: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    const initialize = async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

            } else {
                setSession(null);
            }
        } catch (err) {
            console.error(err);
            setSession(null);

        }
    };

    useEffect(() => {
        initialize();
    }, []);

    const login = async (email: string, password: string) => {
        try{
            const response = await axios.post('/auth/login', { email, password });
            const { access_token } = response.data;
            alert("Logged!")
            setSession(access_token);
            router.push('/reservation');

        }catch(error){
            const { message } = error.data;
            alert(message);
        }
        

    };

    const register = async (email: string, name: string, password: string) => {
        const response = await axios.post('/api/auth/register', {
            email,
        });
        const { accessToken, user } = response.data;

        
    };

    const logout = async () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
