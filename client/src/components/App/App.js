import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserAndEvents } from "../../actions";

import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import EventForm from "../EventForm/EventForm";
import RegistrationsPage from "../RegistrationsPage/RegistrationsPage";
import CreatePage from '../CreatePage/CreatePage';

class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/dashboard" component={DashboardPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/events/:id" component={EventForm} />
                    <Route exact path="/registrations/:id" component={RegistrationsPage} />
                    <Route exact path="/editEvent/:id" component={CreatePage} />

                </div>
            </Router>
        );
    }

    componentDidMount(){
        this.props.fetchUserAndEvents();
    }
}

const mapStateToProps = (state) => {
    return {
        currUser: state.user
    };
};

export default connect(mapStateToProps, { fetchUserAndEvents })(App);