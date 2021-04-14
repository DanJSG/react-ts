import { useState } from "react"
import { CodeChallenge, generateCodeChallenge, generateState } from "../functions/oauthPKCE"

interface PKCEHookReturn {
    state: string;
    codeChallengeAndVerifier: CodeChallenge;
}

export const usePKCE = (): PKCEHookReturn => {

    const [state] = useState(generateState());
    const [codeChallengeAndVerifier] = useState(generateCodeChallenge());

    return { state, codeChallengeAndVerifier };

}
