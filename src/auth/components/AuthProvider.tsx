import React, { useEffect, useState } from "react";
import { OAUTH_API_BASE_PATH, OAUTH_API_HOST, OAUTH_API_PROTOCOL, OAUTH_HOST, OAUTH_LOGIN_PATH, OAUTH_PROTOCOL, OAUTH_REDIRECT_URI, OAUTH_SIGNUP_PATH } from "../../constants/environment";
import { sendAccessRequest } from "../functions/sendAccessRequest";
import { sendTokenRequest } from "../functions/sendTokenRequest";
import { usePKCE } from "../hooks/usePKCE";

interface Props {
    children: React.ReactNode;
};

interface AuthContext {
    authenticated: boolean | undefined;
    login?: () => void;
    signup?: () => void;
    logout?: () => Promise<void>;
    getRefreshToken?: (code: string, state: string) => Promise<boolean>;
    refreshAccessToken?: () => Promise<void>;
    checkAuth?: () => Promise<void>
};

export const AuthContext = React.createContext<AuthContext>({ authenticated: undefined });

const AuthProvider: React.FC<Props> = ({ children }) => {

    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);

    const { state, codeChallengeAndVerifier } = usePKCE();

    const login = (): void => {
        sessionStorage.setItem("code_verifier", codeChallengeAndVerifier.codeVerifier);
        const url = `${OAUTH_PROTOCOL}//${OAUTH_HOST}${OAUTH_LOGIN_PATH}` +
            `?redirect_uri=${OAUTH_REDIRECT_URI}` +
            `&state=${state}` +
            `&code_challenge=${codeChallengeAndVerifier.codeChallenge}` +
            `&code_challenge_method=${codeChallengeAndVerifier.codeChallengeMethod}`;
        window.location.href = url;
    }

    const signup = (): void => {
        sessionStorage.setItem("code_verifier", codeChallengeAndVerifier.codeVerifier);
        const url = `${OAUTH_PROTOCOL}//${OAUTH_HOST}${OAUTH_SIGNUP_PATH}` +
            `?redirect_uri=${OAUTH_REDIRECT_URI}` +
            `&state=${state}` +
            `&code_challenge=${codeChallengeAndVerifier.codeChallenge}` +
            `&code_challenge_method=${codeChallengeAndVerifier.codeChallengeMethod}`;
        window.location.href = url;
    }

    const logout = async (): Promise<void> => {
        const url = `${OAUTH_API_PROTOCOL}//${OAUTH_API_HOST}${OAUTH_API_BASE_PATH}/token/revoke`;
        await sendTokenRequest(url);
        setAuthenticated(false);
    }

    const getRefreshToken = async (code: string, state: string): Promise<boolean> => {
        const codeVerifier = sessionStorage.getItem("code_verifier");
        sessionStorage.removeItem("code_verifier");
        const url = `${OAUTH_API_PROTOCOL}//${OAUTH_API_HOST}${OAUTH_API_BASE_PATH}/token` +
            `?code_verifier=${codeVerifier}` +
            `&redirect_uri=${OAUTH_REDIRECT_URI}` +
            `&grant_type=authorization_code` +
            `&code=${code}` +
            `&state=${state}`;
        return await sendTokenRequest(url);
    }

    const refreshAccessToken = async (): Promise<void> => {
        const url = `${OAUTH_API_PROTOCOL}//${OAUTH_API_HOST}${OAUTH_API_BASE_PATH}/token?grant_type=refresh_token`;
        const result = await sendTokenRequest(url);
        setAuthenticated(result);
    }

    const checkAuth = async () => {
        const accessGranted = await sendAccessRequest();
        setAuthenticated(accessGranted);
    }

    const contextValue: AuthContext = {
        authenticated: authenticated,
        login: login,
        signup: signup,
        logout: logout,
        getRefreshToken: getRefreshToken,
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
