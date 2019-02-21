import React from 'react';

import { Card } from 'antd';


const EventCard = (props) => {
    return(
        <Card style={{width: "100%", marginBottom: "16px"}}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </Card>
    );
};

export default EventCard;