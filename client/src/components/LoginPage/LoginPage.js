import React from 'react';

import { Row, Col } from 'antd';

import LoginForm from '../LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar'

import { LoginBackground, LoginFormContainer } from "../StyledComponents";

const LoginPage = () => {
    return (
        <LoginBackground>
            <Navbar />
            <Row
                type="flex"
                style={{display: 'flex', height: '100%', flex: '1 1 auto', width: '100vw'}}
                align="middle"
                justify="center"
            >
                <Col>
                    <LoginFormContainer>
                        <LoginForm/>
                    </LoginFormContainer>
                </Col>
            </Row>
        </LoginBackground>
    )
};



export default LoginPage;