// AuthContext.tsx
import React, {
    createContext,
    useState,
    useEffect,
    PropsWithChildren,
    useMemo,
} from 'react';
import authService from '../services/authService';
import { Profile } from 'src/types/Profile';

interface AuthContextProps {
    isAuthenticated: boolean;
    saveUser: (token: string) => void;
    removeUser: () => void;
    profile: Profile | null;
}

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        authService.isAuthenticated()
    );

    const profile = useMemo(() => {
        const token = authService.getToken();
        if (!token) return null;
        return authService.getUserFromToken(token);
    }, [isAuthenticated]);

    useEffect(() => {
        const token = authService.getToken();
        setIsAuthenticated(!!token);
    }, []);

    const saveUser = (token: string) => {
        authService.saveToken(token);
        setIsAuthenticated(true);
    };

    const removeUser = () => {
        authService.removeToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, saveUser, removeUser, profile }}>
            {children}
        </AuthContext.Provider>
    );
};
