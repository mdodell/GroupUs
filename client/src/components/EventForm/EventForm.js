import React, { Component } from 'react';

import axios from 'axios';

import Form from "react-jsonschema-form";

import { Link } from 'react-router-dom';

class EventForm extends Component {

    componentDidMount(){
        this.getEvent(this.props.match.params.id);
    }

    onSubmit = ({formData}) => console.log("Data submitted: ", formData);

    getEvent = eventId => {
        axios.get('http://localhost:3001/event/getEvent', {
            params: {
                id: eventId
            }
        }).then(res => this.setState({
            currEvent: res.data,
            currSchema: {
                title: res.data.title,
                description: res.data.description,
                required: res.data.required,
                properties: res.data.properties[0],
                type: res.data.type
            }
        })).catch(err => console.log(err));
    };

    constructor(props){
        super(props);
        this.state = {
            currEvent: null,
            currSchema: null
        }
    }

    render(){
       return this.state.currEvent !== null ?  (
           <div style={{margin: '0 auto', width: '80%'}}>
               <Form schema={this.state.currSchema}
                     onChange={console.log("changed")}
                     onSubmit={this.onSubmit}
                     onError={console.log("errors")} />
               <Link to="/dashboard">Dashboard Link</Link>
           </div>
       ) : <h1>Loading</h1>
    }
};

export default EventForm;