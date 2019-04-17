import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserAndEvents } from "../../actions";

import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import EventForm from "../EventForm/EventForm";
import RegistrationsPage from "../RegistrationsPage/RegistrationsPage";
import CreateFormPage from '../CreateFormPage/CreateFormPage';

class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={DashboardPage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/events/:id" component={EventForm} />
                    <Route path="/registrations/:eventId" component={RegistrationsPage} />
                    <Route path="/editEvent/:id" component={CreateFormPage} />
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