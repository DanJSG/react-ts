import { API_PROTOCOL, API_HOST, API_BASE_PATH } from "../../constants/environment";

export const sendAccessRequest = async (): Promise<boolean> => {
    try {
        const url = `${API_PROTOCOL}//${API_HOST}${API_BASE_PATH}/access`;
        const response = await fetch(url, { method: "GET", credentials: "include" });
        if (response.status !== 200) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
