import React from 'react';

import axios from 'axios';

import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
// import { checkIfUserIsAuthenticated } from '../actions';
//
// export const auth = {
//     async authenticate() {
//         const response = await axios.get("/auth/isAuthenticated").then((res) => res.data.isAuthenticated);
//         this.setState({isAuthenticated: response});
//     }
// };

class PrivateRoute extends React.Component {
    // #2 - `render`, with the body of the SFC inside

    // componentDidMount(){
    //     this.props.checkIfUserIsAuthenticated();
    // }

    render() {
        const { component: Component, ...rest } = this.props;
        return <Route
            {...rest}
            render={props =>
                this.props.currUser === null ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />;
    }
}

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.isAuthenticated,
        currUser: state.currUser
    }
};


export default connect(mapStateToProps)(PrivateRoute);