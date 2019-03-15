import React, { Component } from 'react';

import axios from 'axios';

import Form from "react-jsonschema-form";

import { Link } from 'react-router-dom';

const schema = {
    "title": "A list of tasks",
    "type": "object",
    "required": [
        "title"
    ],
    "properties": {
        "title": {
            "type": "string",
            "title": "Task list title"
        },
        "tasks": {
            "type": "array",
            "title": "Tasks",
            "items": {
                "type": "object",
                "required": [
                    "title"
                ],
                "properties": {
                    "title": {
                        "type": "string",
                        "title": "Title",
                        "description": "A sample title"
                    },
                    "details": {
                        "type": "string",
                        "title": "Task details",
                        "description": "Enter the task details"
                    },
                    "done": {
                        "type": "boolean",
                        "title": "Done?",
                        "default": false
                    }
                }
            }
        }
    }
};

class EventForm extends Component {

    componentDidMount(){
        this.getEvent(this.props.match.params.id);
    }

    onSubmit = ({formData}) => console.log("Data submitted: ",  formData);

    getEvent = eventId => {
        axios.get('http://localhost:3001/event/getEvent', {
            params: {
                id: eventId
            }
        }).then(res => this.setState({
            currEvent: res.data
        })).catch(err => console.log(err));
    };

    constructor(props){
        super(props);
        this.state = {
            currEvent: null
        }
    }

    render(){
        console.log(this.state);
       return this.state.currEvent !== null ?  (
           <div style={{margin: '0 auto', width: '80%'}}>
               <Form schema={schema}
                     onChange={console.log("changed")}
                     onSubmit={this.onSubmit}
                     onError={console.log("errors")} />
               <Link to="/dashboard">Dashboard Link</Link>
           </div>
       ) : <h1>Loading</h1>
    }
};

export default EventForm;