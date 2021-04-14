import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Callback: React.FC = (): null => {

    const { getRefreshToken, refreshAccessToken } = useAuth();
    const history = useHistory();

    useEffect(() => {
        async function getTokens() {
            const queryParams = new URLSearchParams(window.location.search);
            const state = queryParams.get("state");
            const code = queryParams.get("code");
            if (!code || !state || !getRefreshToken || !refreshAccessToken) {
                // TODO handle error somehow -> redirect somewhere ?
                return
            };
            const success = await getRefreshToken(code, state);
            if (!success) {
                // TODO handle error here too
                return;
            };
            await refreshAccessToken();
            history.push("/");
        }
        getTokens();
    }, []);

    return null;

};

export default Callback;
