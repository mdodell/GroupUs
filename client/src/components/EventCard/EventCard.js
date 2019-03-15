import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Card, Icon } from 'antd';

import LoginPage from '../../components/LoginPage/LoginPage'

import EventCardLink from './EventCardLink';

import { FadeIn } from '../StyledComponents';


const EventCard = (props) => {
    return(
           <FadeIn>
                <Card style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                    <p>{props.id}</p>
                    <EventCardLink id={props.id} />
                </Card>
           </FadeIn>
    );
};

export default EventCard;