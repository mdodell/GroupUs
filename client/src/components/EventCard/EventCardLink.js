import React from 'react';

import { Link } from 'react-router-dom';

import { Icon } from 'antd';


const EventCardLink = (props) => {
    return(
            <div>
                <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to={{pathname: `${props.route}/${props.id}`, state: {
                    schema: props.schema
                    }}}>
                    <Icon type={props.linkType}/>
                </Link>
            </div>
    );
};

export default EventCardLink;