import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './NavBar.css';

const NavBar = () => {
    return (
        <AppBar position="static">
            <ToolBar disableGutters={false}>
                <IconButton color="inherit" aria-label="Menu" className="menuButton">
                    <MenuIcon />
                </IconButton>
                <Typography variant= "h4" color="inherit">GroupUs</Typography>
            </ToolBar>
        </AppBar>
    );
};

export default NavBar;