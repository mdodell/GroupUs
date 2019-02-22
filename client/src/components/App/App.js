import React from 'react';

import PrivateRoute from '../../routes/PrivateRoute';

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import './App.css';

import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';

const App = () => {
    return <Router>
        <div>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
        </div>
    </Router>
};


export default App;