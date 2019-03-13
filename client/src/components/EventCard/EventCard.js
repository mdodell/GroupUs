import React from 'react';

import { Card, Button} from 'antd';


const EventCard = (props) => {
    return(
        <Card style={{width: "100%", marginBottom: "16px"}}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            {/*<Button style={{position: 'absolute', top: '10px', right: '10px'}} type="primary">Edit Event Form</Button>*/}
        </Card>
    );
};

export default EventCard;