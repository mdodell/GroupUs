import React, { Component } from 'react';

import axios from 'axios';

import Form from "react-jsonschema-form";

import { addRegistrationDispatch, addPropertiesAndRequiredDispatch } from "../../actions";

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

class EventForm extends Component {

    componentDidMount(){
        this.getEvent(this.props.match.params.id);
    }

    onSubmit = ({formData}) => {
        (axios.post('/event/submitRegistration', {
                eventId: this.state.currEvent._id,
                title: this.state.currEvent.title,
                properties: formData
            })
            .then(res => this.props.addRegistrationDispatch(res.data))
            .catch(err => console.log(err)));
    };

    getEvent = eventId => {
        axios.get('/event/getEvent', {
            params: {
                id: eventId
            }
        }).then(res => this.setEvent(res.data)).catch(err => console.log(err));
    };

    setEvent = (data) => {
        if(data.required == null && data.properties == null){
            this.setState({
                currEvent: data,
                currSchema: {
                    title: data.title,
                    description: data.description,
                    required: null,
                    properties: null,
                    type: data.type
                }
         })
        } else {
            this.setState({
                currEvent: data,
                currSchema: {
                    title: data.title,
                    description: data.description,
                    required: data.required,
                    properties: data.properties[0],
                    type: data.type
                }
            })
        }
    };

    constructor(props){
        super(props);
        this.state = {
            currEvent: null,
            currSchema: null
        };
    }


    render(){
        const { currEvent, currSchema } = this.state;
        if(currEvent !== null && currEvent.properties === null && currEvent.required === null && this.props.currUser && currEvent.userId === this.props.currUser.user.userId) {
            return <h1>Redirect</h1>
        }else if (currEvent !== null){
            return (
                <div style={{margin: '0 auto', width: '80%'}}>
                    <Form schema={currSchema}
                          onChange={console.log("changed")}
                          onSubmit={this.onSubmit}
                          onError={console.log("errors")}/>
                    <Link to="/dashboard">Dashboard Link</Link>
                </div>
            )
        } else {
            return <Loading />
        }
    }
};

const mapStateToProps = state => {
    return {
        currEvents: state.events,
        currUser: state.currUser
    };
};

export default connect(mapStateToProps, { addRegistrationDispatch, addPropertiesAndRequiredDispatch })(EventForm);