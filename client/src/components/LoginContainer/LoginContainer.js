import React from 'react';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Grid from '@material-ui/core/Grid';

const LoginContainer = () => {
    return (
        <div>
            <NavBar />
            <Grid
                container
                alignItems="center"
                justify="center"
                style={{ minHeight: '65vh' }}
            >
            <Login/>
            </Grid>
        </div>

    )
};

export default LoginContainer;