import React, { Component } from 'react';
import AddQuestionsWrapper from './AddQuestionsWrapper';
import FormWrapper from './FormWrapper';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCurrEventTitle, updateCurrEventDescription, addRequiredToCurrEvent, addPropertyToCurrEvent } from '../../actions';

class CreatePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            currEvent: null,
            currSchema: null
        }
    }

    componentDidMount(){
        this.getEvent(this.props.match.params.id);
    }

    getEvent = eventId => {
        axios.get('/event/getEvent', {
            params: {
                id: eventId
            }
        }).then(res => {
            this.setEvent(res.data);
            this.props.updateCurrEventTitle(res.data.title);
            this.props.updateCurrEventDescription(res.data.description);
        }).catch(err => console.log(err));
    };

    setEvent = (data) => {
        console.log(data);
        if(data.required === null && data.properties === null){
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
            });
            console.log(data.properties);

            data.properties.forEach(property => this.props.addPropertyToCurrEvent(property));
            data.required.forEach(required => this.props.addRequiredToCurrEvent(required));
        }
    };

    render() {
        if (this.state.currEvent === null) {
            return <Loading/>
        }
        else {
            return (
                <div>
                    <FormWrapper currEvent={this.state.currEvent}/>
                    <AddQuestionsWrapper event={this.state.currEvent}/>
                </div>
            );
        }
    }
};

const mapStateToProps = state => {
    return {
        currUser: state.currUser
    };
};


export default connect(mapStateToProps, { updateCurrEventTitle, updateCurrEventDescription, addRequiredToCurrEvent, addPropertyToCurrEvent })(CreatePage);