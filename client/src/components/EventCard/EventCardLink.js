import React from 'react';

import { Link } from 'react-router-dom';

import { Icon } from 'antd';


const EventCardLink = (props) => {
    return(
            <div>
                <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to={`/events/${props.id}`}>
                    <Icon type="link"/>
                </Link>
            </div>
    );
};

export default EventCardLink;