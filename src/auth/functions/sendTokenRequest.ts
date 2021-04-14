import { JSON_CONTENT_TYPE } from "../../constants/headers";

export const sendTokenRequest = async (url: string): Promise<boolean> => {
    const response = await fetch(url, {
        method: "POST",
        headers: JSON_CONTENT_TYPE,
        credentials: "include"
    })
    if(response instanceof Error || response.status !== 200) return false;
    return true;
}