import React from "react";
import { Redirect, Route } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

interface Props {
    children: React.ReactNode;
    [remaining: string]: any;
};

const PrivateRoute: React.FC<Props> = ({ children, ...remaining }) => {

    const { authenticated } = useAuth();

    // TODO review redirect route
    return (
        <Route {...remaining}>
            {(authenticated === undefined) && <Loading />}
            {(authenticated === false) && <Redirect to="/log-in"></Redirect>}
            {authenticated && children}
        </Route>
    )
}

export default PrivateRoute;