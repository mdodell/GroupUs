import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactExport from 'react-data-export';
import axios from 'axios';

import Loading from '../Loading/Loading';

import { Table, Button, Icon } from 'antd';

import { Link } from 'react-router-dom';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
               id: this.props.match.params.id
           }
       }).then(res => {
           this.setState({currEvent: res.data});
           this.getRegistrations(res.data)
       }).catch(err => console.log(err));
    };

    render() {
        const {registrations, loading, currEvent} = this.state;
        if(loading){
            return <Loading />
        }
        if(currEvent !== null && currEvent.properties === null && currEvent.required === null){
            return <h1>Please set up the event schema!</h1>
        }else if (currEvent !== null) {

            const excelDataSet = [];

            const excelTitles = {};
            excelTitles.columns = [];
            excelTitles.data = [];
            excelTitles.data.push([{value: "GroupUs", style: {font: {name: "Segoe UI", sz: "16", bold: true}}}]);
            excelTitles.data.push([{value: ""}]);
            if(currEvent.title){
                excelTitles.data.push([{value: "Title:", style: {font: {name: "Segoe UI", sz: "14", bold: true}}}]);
                excelTitles.data.push([{value: currEvent.title, style: {font: {name: "Segoe UI", sz: "14"}}}]);
                if(currEvent.description){
                    excelTitles.data.push([{value: ""}]);
                    excelTitles.data.push([{value: "Description:", style: {font: {name: "Segoe UI", sz: "14", bold: true}}}]);
                    excelTitles.data.push([{value: currEvent.description, style: {font: {name: "Segoe UI", sz: "14"}}}]);
                }
            }
            excelTitles.ySteps = -1;
            excelDataSet.push(excelTitles);

            let columns = [];
            let eventProperties = currEvent.properties[0];
            Object.keys(eventProperties).forEach(key => columns.push({
                title: eventProperties[key].title,
                dataIndex: key,
                key: key
            }));

            const excelCols = [];
            for(var i=0; i<columns.length; i++){
                excelCols.push({value: columns[i].title, style: {font: {name: "Segoe UI", sz: "12", bold: true}}});
            }
            const excelHeader = {};
            excelHeader.columns = [];
            excelHeader.data = [excelCols];
            excelHeader.ySteps = 0;
            excelDataSet.push(excelHeader);

            const excelRows = [];
            for(var x=0; x<this.state.registrations.length; x++){
                const excelRow = [];
                for(var y=0; y<columns.length; y++){
                    excelRow.push(this.state.registrations[x].hasOwnProperty(columns[y].key) ? {style: {font: {name: "Segoe UI", sz: "12"}}, value: this.state.registrations[x][columns[y].key]} : {style: {font: {name: "Segoe UI", sz: "12"}}, value: ""});
                }
                excelRows.push(excelRow);
            }
            const excelBody = {};
            excelBody.columns = [];
            excelBody.data = excelRows;
            excelBody.ySteps = -1;
            excelDataSet.push(excelBody);

            console.log(excelDataSet);

            return (
                <div style={{margin: '10px'}}>
                    <Button type="primary">
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                            <Icon type="desktop" style={{marginRight: "10px"}}/>
                            <span>Dashboard</span>
                        </Link>
                    </Button>
                    <Table title={() => this.state.currEvent.title}dataSource={this.state.registrations} columns={columns} />
                    {registrations.length > 0 ? <ExcelFile element={<Button type="primary" shape="round" icon="download" size="large">Download</Button>}><ExcelSheet dataSet={excelDataSet} name="Registrations"/></ExcelFile> : null}
                </div>
            )
        }
        return <Loading />
    }
};

const mapStateToProps = state => {
    return {
        currUser: state.currUser,
        listOfEvents: state.events
    }
};

export default connect(mapStateToProps)(RegistrationsPage);
