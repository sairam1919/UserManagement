import React from 'react';
import './App.css';
import Login from './containers/Login';
import { TopNavBar } from "./_components";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ViewportProvider } from './_hooks';
import HomePage from './containers/homePage';

const LoginPage = () => {
  return (
    <div className="App-container" style={{ height: window.innerHeight, width: window.innerWidth}} >
      <TopNavBar />
      <Login/>
    </div>
  );
}

const LandingPage = () => {
  return (
    <div className="App-container" style={{ height: window.innerHeight, width: window.innerWidth}} >
      <TopNavBar />
      <HomePage />
    </div>
  );
}

const App = () =>{
  return (
    <ViewportProvider>
    <Router>
    <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/home"  component={LandingPage} />
    <Redirect to="/" />
    </Switch>
      </Router>
      </ViewportProvider>
  )
}

export default App;
