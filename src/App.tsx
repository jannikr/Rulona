import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage/LandingPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
