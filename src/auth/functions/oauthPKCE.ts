import { SHA256 } from 'crypto-js';

export interface CodeChallenge {
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: "S256";
}

const b64urlEncode = (value: string): string => {
    return btoa(value).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}

const generateSecureString = (length: number): string => {
    const randArray = new Uint8Array(length);
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let secureString = "";
    window.crypto.getRandomValues(randArray);
    for(const i in randArray) {
        secureString += chars[randArray[i] % chars.length]
    }
    return secureString;
}

export const generateState = () => {
    return generateSecureString(12);
}

export const generateCodeChallenge = (): CodeChallenge => {
    const length = Math.floor(Math.random() * 86) + 43;
    const codeVerifier = generateSecureString(length);
    return {
        codeVerifier: codeVerifier,
        codeChallenge: b64urlEncode(SHA256(codeVerifier).toString()),
        codeChallengeMethod: 'S256'
    };
}
