import React, { Component } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import PrivateRoute from '../../routes/PrivateRoute';
import {fetchUser} from '../../actions/index';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        const user = axios.get('http://localhost:3001/auth/getUser', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
            withCredentials: true
        }).then(json => json.data);
        this.state = {user};
    }

    render() {
       console.log(this.state);
       return (
           <Router>
            <div>
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/dashboard" component={DashboardPage} />
            </div>
          </Router>
          );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currUser
    };
};

export default connect(mapStateToProps, {fetchUser})(App);
