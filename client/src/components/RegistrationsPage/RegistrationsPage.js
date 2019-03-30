import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';

import Loading from '../Loading/Loading';

import { Table, Button, Icon} from 'antd';

class RegistrationsPage extends Component {

    state = {
        registrations: [],
        loading: false,
        error: null,
        currEvent: null
    };

    getRegistrations = async (event)=> {
        this.setState({loading: true});
        const promises = event.registrations.map(registration => {
            return axios
                .get("/event/getRegistration", {
                    params: {
                        id: registration
                    }
                })
                .then(({ data }) => {
                    return {...data.properties, key: data._id};
                });
        });

        const registrations = await Promise.all(promises).then(function(values) {
            return values;
        }).catch(error => {
            this.setState({loading: false, error})
        });

        this.setState({registrations, loading: false});
    };

    componentDidMount() {
        this.getEvent();
    }

    getEvent = () => {
       axios.get('/event/getEvent', {
           params: {
               id: this.props.match.params.eventId
           }
       }).then(res => {
           this.setState({currEvent: res.data});
           this.getRegistrations(res.data)
       }).catch(err => console.log(err));
    };

    render() {
        const {registrations, loading, error, currEvent} = this.state;
        if (this.state.currEvent) {
            let columns = [];
            let eventProperties = currEvent.properties[0];
            Object.keys(eventProperties).forEach(key => columns.push({
                title: eventProperties[key].title,
                dataIndex: key,
                key: key
            }));
            return (
                <div style={{margin: '10px'}}>
                    <Table title={() => this.state.currEvent.title}dataSource={this.state.registrations} columns={columns} />
                    {this.state.registrations.length > 0 ? <CSVLink data={this.state.registrations} target="_blank"><Button type="primary" shape="round" icon="download" size="large">Download</Button></CSVLink> : null}
                </div>
            )
        }
        return <Loading/>
    }
};

const mapStateToProps = state => {
    return {
        currUser: state.currUser,
        listOfEvents: state.events
    }
};

export default connect(mapStateToProps)(RegistrationsPage);
