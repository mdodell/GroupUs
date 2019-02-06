import React from 'react';
import { connect } from 'react-redux';

const App = (props) => {
        if(!props.user) {
            return <div>Not logged in</div>
        }
        return <div>Logged in</div>
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.currUser
    };
};

export default connect(mapStateToProps)(App);