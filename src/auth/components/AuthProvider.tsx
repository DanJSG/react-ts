import React, { useEffect, useState } from "react";
import { API_BASE_PATH, API_HOST, API_PROTOCOL, OAUTH_BASE_PATH, OAUTH_HOST, OAUTH_PROTOCOL } from "../../constants/environment";
import { generateCodeChallenge, generateState } from "../functions/oauthPKCE";
import { sendTokenRequest } from "../functions/sendTokenRequest";

interface Props {
    children: React.ReactNode;
};

interface User {
    id: number;
    email: string;
};

interface AuthContext {
    user?: User;
    authenticated: boolean | undefined;
    login?: () => void;
    signup?: () => void;
    logout?: () => void;
    refreshAccessToken?: () => Promise<void>;
    checkAuth?: () => Promise<void>
};

export const AuthContext = React.createContext<AuthContext>({ authenticated: undefined });

const AuthProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState();
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);

    // TODO move these into usePKCE hook
    const [codeChallengeAndVerifier] = useState(generateCodeChallenge());
    const [state] = useState(generateState());

    // don't include in this form in general oauth template - only relevant for auth provider
    // in general oauth template generate the state and code challenge, then redirect to auth provider login with 
    // query params in URI
    const login = (): void => {
        // TODO redirect to auth provider with relevant query strings
    }

    // don't include in general oauth template - only relevant for auth provider
    // in general oauth template generate the state and code challenge, then redirect to auth provider login with 
    // query params in URI
    const signup = (): void => {
        // TODO redirect to auth provider with relevant query strings
    }

    const logout = (): void => {
        // TODO delete cookies, make user undefined, set auth to false
    }

    const refreshAccessToken = async (): Promise<void> => {
        const url = `${OAUTH_PROTOCOL}//${OAUTH_HOST}${OAUTH_BASE_PATH}/token?grant_type=refresh_token`;
        const result = await sendTokenRequest(url);
        setAuthenticated(result);
    }

    const checkAuth = async () => {
        try {
            const url = `${API_PROTOCOL}//${API_HOST}${API_BASE_PATH}/access`;
            // TODO refactor into function
            const response = await fetch(url, { method: "GET", credentials: "include" });
            if (response.status !== 200) {
                setAuthenticated(false);
                return;
            }
            setAuthenticated(true);
        } catch (error) {
            console.error(error);
            setAuthenticated(false);
        }
    }

    const contextValue: AuthContext = {
        user: user,
        authenticated: authenticated,
        login: login,
        signup: signup,
        logout: logout,
        refreshAccessToken: refreshAccessToken,
        checkAuth: checkAuth
    };

    useEffect(() => {
        async function loadAuthOnRefresh() {
            await refreshAccessToken();
            checkAuth();
        }
        loadAuthOnRefresh();
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
