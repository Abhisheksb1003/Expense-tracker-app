import './App.css';
import React, {Fragment} from 'react'
import Signuppage from './Components/Signuppage';
import { Route, Redirect, Switch } from "react-router-dom";
import Profilepage from './Components/Profilepage';
import Header from './UI/Header';
import Forgotpassword from './Pages/Forgotpassword';
import DailyExpenses from './Pages/DailyExpenses';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Signuppage />
        </Route>
        <Route path="/home">
          <DailyExpenses />
        </Route>
        <Route path="/profile">
          <Profilepage />
        </Route>
        <Route path="/forgotpwd">
          <Forgotpassword />
        </Route>
      </Switch>
    </Fragment>
  );
}
export default App;