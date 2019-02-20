import React, { Component } from 'react';

import { FormTitle, LoginForm} from '../StyledComponents'

import { Button } from 'antd';


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

    handleSubmit(event){
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
            <div>
                <FormTitle>Login</FormTitle>
                <LoginForm onSubmit={this.handleSubmit}>
                        <input placeholder="username" type="text" value={this.state.username} onChange={this.handleUserNameChange} required/>
                        <input placeholder="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                    <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                </LoginForm>
            </div>

        )
    }
}



export default LoginFormWrapper;