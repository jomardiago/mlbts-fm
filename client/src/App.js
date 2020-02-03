import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import NavBar from './components/navbar/NavBar';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Roster from './components/roster/Roster';
import AddPlayer from './components/roster/AddPlayer';
import UpdatePlayer from './components/roster/UpdatePlayer';
import PlayerProgression from './components/roster/PlayerProgression';
import Alert from './components/alert/Alert';

import PrivateRoute from './components/routing/PrivateRoute';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import * as authActions from './redux/auth/authActions';

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  useEffect(() => {
    store.dispatch(authActions.loadUserAction());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/roster" component={Roster} />
              <PrivateRoute exact path="/roster/create-player" component={AddPlayer} />
              <PrivateRoute exact path="/roster/update-player/:id" component={UpdatePlayer} />
              <PrivateRoute exact path="/roster/player-progression/:id" component={PlayerProgression} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
