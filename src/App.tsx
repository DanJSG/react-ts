import React, { useEffect } from "react";
import AuthProvider from "./auth/components/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/components/PrivateRoute";


const App: React.FC = () => {

    useEffect(() => {
        console.log(process.env.REACT_APP_API_PROTOCOL);
    })

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/">

                    </Route>
                    <PrivateRoute exact path="/private">

                    </PrivateRoute>
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
