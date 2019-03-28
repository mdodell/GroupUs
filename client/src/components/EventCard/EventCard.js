import React from 'react';

import { Card } from 'antd';

import EventCardLink from './EventCardLink';

import { FadeIn } from '../StyledComponents';

const EventCard = (props) => {
    return (
           <FadeIn>
                <Card style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                    <EventCardLink linkType="link" route="/events" id={props.id} />
                    <EventCardLink linkType="table" route="/registrations" id={props.id} />
                </Card>
           </FadeIn>
    );
};

export default EventCard;