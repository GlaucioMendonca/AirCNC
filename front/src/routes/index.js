import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import New from "../pages/new";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}
