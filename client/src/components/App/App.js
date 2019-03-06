import React, { Component } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';

import { connect } from 'react-redux';
import { fetchUser } from '../../actions';

class App extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
       return <DashboardPage currUser={this.props.user} />
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currUser
    };

};

export default connect(mapStateToProps, { fetchUser })(App);