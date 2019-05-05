import React, { Component } from 'react';
import './FormWrapper.css';
import { Typography } from 'antd';
import FormDisplay from './FormDisplay';
const { Title } = Typography;

class FormWrapper extends Component {
    render(){
        const { title, description } = this.props.currEvent;
        return (
            <div className="formContainer">
                <div style={{marginTop: '30px', marginLeft: '30px'}}>
                    <Typography>
                        <Title level={1}>{ title }</Title>
                    </Typography>
                    <Typography>
                        <Title level={4}>{description}</Title>
                    </Typography>
                </div>
                <FormDisplay event={this.props.currEvent}/>
            </div>
        )
    }
};

export default FormWrapper;