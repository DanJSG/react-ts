import React, { useEffect } from "react";
import AuthProvider from "./auth/components/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/components/PrivateRoute";
import Home from "./pages/Home";
import Callback from "./auth/components/Callback";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/auth/callback">
                        <Callback />
                    </Route>
                    <PrivateRoute exact path="/private">

                    </PrivateRoute>
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
