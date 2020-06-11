import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAppContext } from "./libs/contextLib";

import Home from "./components/home";
import NotFound from "./components/notfound";
import Login from "./components/login";
import Todo from "./components/todo";

export default function Routes() {
  const { hadCookie } = useAppContext();
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        {hadCookie.login !== "true" ? <Login /> : <Redirect to='/todo' />}
      </Route>
      <Route exact path="/todo">
        {hadCookie.login === "true" ? <Todo /> : <Redirect to='/login' />}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}