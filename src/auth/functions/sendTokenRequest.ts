import { JSON_CONTENT_TYPE } from "../../constants/headers";

export const sendTokenRequest = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: JSON_CONTENT_TYPE,
            credentials: "include"
        })
        if(response.status !== 200) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}