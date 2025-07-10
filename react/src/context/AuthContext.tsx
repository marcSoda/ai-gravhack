import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '@/utils/axiosConfig'

interface AuthContextType {
    isAuthenticated: boolean | null;
    updateAuthStatus: (status: boolean) => void;
}

// Create a context with an initial value that matches the expected structure
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSession = () => {
            axios.get("/api/authx/check_session", {
                withCredentials: true
            })
            .then(response => setIsAuthenticated(!!response.data.isAuthenticated))
            .catch(() => setIsAuthenticated(false));
        };
        checkSession();
    }, []);

    const updateAuthStatus = (status: boolean) => {
        setIsAuthenticated(status);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, updateAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
