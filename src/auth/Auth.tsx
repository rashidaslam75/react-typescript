import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { Login } from './login/Login';
import { Register } from './register/register';

export const Auth = () => {
  let {  url } = useRouteMatch();
  
  return (
    <Router>
      <Switch>
        <Route path={`${url}/login`}>
          <Login />
        </Route>
        <Route path={`${url}/register`}>
          <Register />
        </Route>
        <Route path="/" >
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}
