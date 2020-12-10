import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from '../pages/login';
import Home from '../pages/home';

const Routes = () => {

    return (
        <div id="Page-routes">

            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/home" component={Home}  />
            </Switch>

        </div>
    )
}

export default Routes;