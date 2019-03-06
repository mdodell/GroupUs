import React, { Component } from 'react';

import { FormTitle, LoginForm, LoginInput, InputWrapper, InputIcon, LoginButton, FormText, FormFooterText } from '../StyledComponents'

import { Icon, Row, Col } from 'antd';

import { GoogleButton, FacebookButton } from '../Buttons/Buttons';

import './LoginFormWrapper.css';


class LoginFormWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('Account submitted. Username is: ' + this.state.username + ' password is: ' + this.state.password);
        event.preventDefault();
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render(){
        return (
            <div className="containerStyle">
                <FormTitle>Login</FormTitle>
                <LoginForm autoComplete="new-password" onSubmit={this.handleSubmit}>
                        <InputWrapper>
                            <LoginInput
                                className="loginInput"
                                placeholder="Email"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUserNameChange}
                            />
                            <InputIcon><Icon type="mail" /></InputIcon>
                        </InputWrapper>


                        <InputWrapper>
                            <LoginInput
                                className="loginInput"
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <InputIcon><Icon type="lock" /></InputIcon>
                        </InputWrapper>

                    <LoginButton onClick={this.handleSubmit}>Submit</LoginButton>
                </LoginForm>
                <FormText>Or login with</FormText>
                <Row gutter={12} type="flex" align="middle">
                    <Col span={12}>
                        <FacebookButton/>
                    </Col>
                    <Col span={12}>
                        <GoogleButton/>
                    </Col>
                </Row>

                <FormFooterText>Not a member? Sign up now</FormFooterText>
            </div>

        )
    }
}



export default LoginFormWrapper;