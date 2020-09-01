import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from '../authentication/login/login';
import DashBoard from '../dashboard/dashboard';
import React from 'react';
import SignUp from '../authentication/signup/signup';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
