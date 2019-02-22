import React, { Component } from 'react';

import LoginFormWrapper from '../LoginFormWrapper/LoginFormWrapper';

import { LoginBackground, LoginFormContainer } from "../StyledComponents";

import { connect } from 'react-redux';

// import { auth } from '../../routes/PrivateRoute';

import { Redirect, Route} from 'react-router-dom';

// import { checkIfUserIsAuthenticated } from "../../actions";
import DashboardPage from "../DashboardPage/DashboardPage";

class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    // componentDidMount(){
    //     this.props.checkIfUserIsAuthenticated();
    // }


    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const redirectToReferrer = this.props.currUser;
        console.log(redirectToReferrer);
        console.log(from);
        if (redirectToReferrer !== null) {
            console.log("redirect!");
            return <Redirect to={from} />;
        }
        return (
            <LoginBackground>
                <LoginFormContainer>
                    <LoginFormWrapper/>
                </LoginFormContainer>
            </LoginBackground>
        )
    }
};


const mapStateToProps = state => {
    return {
        currUser: state.currUser
    }
};


export default connect(mapStateToProps)(LoginPage);