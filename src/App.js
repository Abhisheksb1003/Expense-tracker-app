import './App.css';
import React, {Fragment} from 'react'
import Signuppage from './Components/Signuppage';
import { Route, Redirect, Switch } from "react-router-dom";
import Home from './Components/Home';

function App() {
  return (
    <Fragment>
      <Switch>
      <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Signuppage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;