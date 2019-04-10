import React from 'react';

import { Link } from 'react-router-dom';

import { Icon, Tooltip } from 'antd';

import { EventCardIconWrapper } from '../StyledComponents';


const EventCardIcon = (props) => {
    return(
            <EventCardIconWrapper>
                <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to={{pathname: `${props.route}/${props.id}`, state: {
                    schema: props.schema
                    }}}>
                    <Tooltip title={props.tooltipPrompt}><Icon type={props.iconType}/></Tooltip>
                </Link>
            </EventCardIconWrapper>
    );
};

export default EventCardIcon;