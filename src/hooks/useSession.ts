import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

export const useSession = () => {
    const { profile, isAuthenticated, removeUser } = useContext(AuthContext);

    return {
        profile,
        isLoggedIn: isAuthenticated,
        logout: removeUser,
    };
};
