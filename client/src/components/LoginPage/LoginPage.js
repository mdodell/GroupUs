import React from 'react';

import { Button } from 'antd';

import LoginFormWrapper from '../LoginFormWrapper/LoginFormWrapper';


import { LoginBackground, LoginFormContainer } from "../StyledComponents";

const LoginPage = () => {
    return (
        <LoginBackground>
            <LoginFormContainer>
                <LoginFormWrapper />
            </LoginFormContainer>
        </LoginBackground>
    )
};

export default LoginPage;