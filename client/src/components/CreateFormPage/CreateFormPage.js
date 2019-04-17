import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import '../App/App.css'
import axios from 'axios';
import { conferenceSchema } from '../../formSchemas/formSchemas';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { addPropertiesAndRequiredDispatch } from "../../actions";
import { NavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';


class CreateFormPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            currEvent: null,
            currSchema: null,
            json: conferenceSchema
        };
    }

    componentDidMount(){
        this.getEvent(this.props.match.params.id);
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

    getEvent = eventId => {
        console.log(eventId);
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
                },
                json: {
                    required: data.required,
                    properties: data.properties[0],
                }
            })
        }
    };

    render() {
        const {currEvent, json} = this.state;
        console.log(this.state);
        if (currEvent !== null) {
            return (
                <div>
                    <div stlye={{ display: 'flex', flexDirection: 'column'}}>
                                <h1>{currEvent.title}</h1>
                                <p>{currEvent.description}</p>
                                <Editor
                                    history={true}
                                    navigationBar={false}
                                    mode='tree'
                                    value={json}
                                    onChange={this.handleJSONInputChange}
                                />
                                <NavLink to="/dashboard">
                                    <Button style={{width: '200px', margin: '10px'}} type="primary" onClick={() => this.handleJSONSubmit(this.state)}>
                                        Submit
                                    </Button>
                                </NavLink>
                     </div>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => {
    return {
        currUser: state.currUser,
    };
};

export default connect(mapStateToProps, { addPropertiesAndRequiredDispatch })(CreateFormPage);