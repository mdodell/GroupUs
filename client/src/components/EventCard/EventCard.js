import React from 'react';

import { Card } from 'antd';

import EventCardLink from './EventCardLink';

import { FadeIn } from '../StyledComponents';

const renderEventCards = ({registrations, properties, id}) => {
    if(registrations !== null && properties !== null){
        return (
            <div>
                <EventCardLink linkType="link" route="/events" id={id} />
                <EventCardLink linkType="table" route="/registrations" id={id} />
            </div>
        )
    } else {
        return (
            <div>
                <EventCardLink linkType="link" route="/events" id={id} />
            </div>
        )
    }
}

const EventCard = (props) => {
    const {title, description } = props;
    return (
           <FadeIn>
                <Card onClick={() => console.log(props)} style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    {renderEventCards(props)}
                </Card>
           </FadeIn>
    );
};

export default EventCard;