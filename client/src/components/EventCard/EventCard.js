import React from 'react';

import { Card, Typography } from 'antd';

import EventCardIcon from './EventCardLink';

import { FadeIn, EventCardLinkGroup } from '../StyledComponents';

const { Title, Text } = Typography;

const renderEventCards = ({registrations, properties, id}) => {
    if(registrations !== null && properties !== null){
        return (
            <EventCardLinkGroup>
                <EventCardIcon tooltipPrompt="Event Form" iconType="link" route="/events" id={id} />
                <EventCardIcon tooltipPrompt="Registrations " iconType="table" route="/registrations" id={id} />
                <EventCardIcon tooltipPrompt="Edit Event" iconType="edit" route="/editEvent" id={id} />
            </EventCardLinkGroup>
        )
    } else {
        return (
            <EventCardLinkGroup>
                <EventCardIcon tooltipPrompt="Create Form" iconType="edit" route="/editEvent" id={id} />
            </EventCardLinkGroup>
        )
    }
};

const EventCard = (props) => {
    const { title, description } = props;
        return (
            <FadeIn>
                <Card style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <Title strong>{title}</Title>
                    <Text type="secondary">{description}</Text>
                    {renderEventCards(props)}
                </Card>
            </FadeIn>
        );
};

export default EventCard;