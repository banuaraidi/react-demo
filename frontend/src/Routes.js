import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./components/notfound";
import Login from "./components/login";
import Todo from "./components/todo";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/todo">
        <Todo />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}