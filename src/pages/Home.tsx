import React from "react";
import { useAuth } from "../auth/hooks/useAuth";

// TODO delete this file - just used for testing auth

const Home: React.FC = () => {

    const { login, logout, signup } = useAuth();

    return (
        <div>
            <button onClick={login} className="btn btn-primary">Login</button>
            <button onClick={logout} className="btn btn-danger">Logout</button>
            <button onClick={signup} className="btn btn-info">Sign Up</button>
        </div>
    );
}

export default Home;
