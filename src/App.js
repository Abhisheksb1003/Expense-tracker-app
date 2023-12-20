import './App.css';
import React, {Fragment} from 'react'
import Signuppage from './Components/Signuppage';
import { Route, Redirect, Switch } from "react-router-dom";
import Profilepage from './Components/Profilepage';
import Header from './UI/Header';
import Home from './Pages/Home';

function App() {
  return (
    <Fragment>
      <Header/>
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
        <Route path='/profile'>
          <Profilepage/>
        </Route>
      </Switch>
    </Fragment>
  );
}
export default App;