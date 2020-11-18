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
import Dashboard from './containers/dashboard/Dashboard';

const LoginPage = () => {
  return (
    <div className="App-container" style={{ height: window.innerHeight, width: window.innerWidth}} >
      <TopNavBar />
      <Login/>
    </div>
  );
}

const DashboardPage = () => {
  return (
    <div className="App-container" style={{ height: window.innerHeight, width: window.innerWidth}} >
      <TopNavBar />
      <Dashboard />
    </div>
  );
}

const App = () =>{
  return (
    <ViewportProvider>
    <Router>
    <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/home"  component={DashboardPage} />
    <Redirect to="/" />
    </Switch>
      </Router>
      </ViewportProvider>
  )
}

export default App;
