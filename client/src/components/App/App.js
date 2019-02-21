import React, { Component } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';

import { connect } from 'react-redux';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount(){
        this.setState({loggedIn: true });
    }

    render() {
       return <DashboardPage />
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        user: state.currUser
    };
};

export default connect(mapStateToProps)(App);