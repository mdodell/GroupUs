import React, { Component } from 'react';
import Form from 'react-jsonschema-form';

import { Button, message } from 'antd';

import { connect } from 'react-redux';
import axios from "axios/index";

import {addPropertiesAndRequiredDispatch} from "../../actions";

class FormDisplay extends Component {
    handleJSONSubmit() {
        const { event, currEvent } = this.props;
        axios.post('/event/updateEvent', {
            eventId: event._id,
            required: currEvent.required,
            properties: currEvent.properties
        }).then(res => {
            this.props.addPropertiesAndRequiredDispatch(res.data);
            message.success("Updated the form!")
        }).catch(err => message.error("There was an error with updating the form!"));
    };

    render(){
        if (!Object.keys(this.props.currEvent.properties).length) {
            return <h1 style={{
                flex: '1 1 auto',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>Select one of the question types on the right to get started!</h1>
        } else {
            //make sure to style the div here so it looks like a 'preview' of the form, and note that it needs a title, type, and description
            let schema = this.props.currEvent;
            schema.properties = this.props.currEvent.properties;
            return (
                <div style={{width: '50%', margin: '0 auto', maxHeight: '80vh'}}>
                    <Form schema={this.props.currEvent}>
                        <br/>
                    </Form>
                    <Button type="primary" onClick={() => this.handleJSONSubmit()}>Update Form</Button>
                </div>
            )
        }
    }
};


const mapStateToProps = state => {
    return {
        currEvent: state.newEvent
    };
};

export default connect(mapStateToProps, {addPropertiesAndRequiredDispatch})(FormDisplay);