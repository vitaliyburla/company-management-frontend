import { parseJwt } from 'src/utils/parseJwt';

const TOKEN_KEY = 'user_token';

const authService = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    saveToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    removeToken: () => localStorage.removeItem(TOKEN_KEY),
    isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
    getUserFromToken: (token: string) => parseJwt(token),
};

export default authService;
