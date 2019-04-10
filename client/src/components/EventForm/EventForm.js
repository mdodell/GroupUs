import React, { Component } from 'react';

import axios from 'axios';

import Form from "react-jsonschema-form";

import { addRegistrationDispatch, addPropertiesAndRequiredDispatch } from "../../actions";

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Link } from 'react-router-dom';

import Loading from '../Loading/Loading';

import { Button } from 'antd';

import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { conferenceSchema } from '../../formSchemas/formSchemas';

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
            currSchema: null,
            json: conferenceSchema
        };
    }

    handleJSONInputChange = (json) => {
        this.setState({json})
    };

    handleJSONSubmit = ({currEvent, json}) => {
        axios.post('/event/updateEvent', {
            eventId: currEvent._id,
            required: json.required,
            properties: json.properties
        }).then(res => this.props.addPropertiesAndRequiredDispatch(res.data)).catch(err => console.log(err));
    };

    render(){
        const { currEvent, currSchema } = this.state;
        if(currEvent !== null && currEvent.properties === null && currEvent.required === null && this.props.currUser && currEvent.userId === this.props.currUser.user.userId){
            return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1>{currEvent.title}</h1>
                    <p>{currEvent.description}</p>
                    <Editor
                        history={true}
                        navigationBar={false}
                        mode='tree'
                        value={conferenceSchema}
                        onChange={this.handleJSONInputChange}
                    />
                    <NavLink to="/dashboard">
                        <Button style={{width: '200px', margin: '10px'}} type="primary" onClick={() => this.handleJSONSubmit(this.state)}>
                            Submit
                        </Button>
                    </NavLink>
                    <Link to="/dashboard">Dashboard Link</Link>
                </div>
            )
        } else if (currEvent !== null){
            return <div style={{margin: '0 auto', width: '80%'}}>
                <Form schema={currSchema}
                      onChange={console.log("changed")}
                      onSubmit={this.onSubmit}
                      onError={console.log("errors")}/>
                <Link to="/dashboard">Dashboard Link</Link>
            </div>
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