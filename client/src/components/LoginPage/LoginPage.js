import React from 'react';

import { Button } from 'antd';

import LoginForm from '../LoginForm/LoginForm';


import { LoginBackground, LoginFormContainer } from "../StyledComponents";

const LoginPage = () => {
    return (
        <LoginBackground>
            <LoginFormContainer>
                <LoginForm/>
                <Button type="primary">Button</Button>
            </LoginFormContainer>
        </LoginBackground>
    )
};

export default LoginPage;