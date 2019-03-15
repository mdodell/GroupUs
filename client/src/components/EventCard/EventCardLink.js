import React from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import EventForm from '../../components/EventForm/EventForm';

import { Icon } from 'antd';


const EventCardLink = (props) => {
    console.log(props);
    return(
            <div>
                <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to={`/events/${props.id}`}>
                    <Icon type="link"/>
                </Link>
            </div>
    );
};

export default EventCardLink;