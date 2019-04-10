import React from 'react';

import { Card, Typography } from 'antd';

import EventCardIcon from './EventCardLink';

import { FadeIn, EventCardLinkGroup } from '../StyledComponents';

const { Title, Paragraph } = Typography;

const renderEventCards = ({registrations, properties, id}) => {
    if(registrations !== null && properties !== null){
        return (
            <EventCardLinkGroup>
                <EventCardIcon tooltipPrompt="Event Form" iconType="link" route="/events" id={id} />
                <EventCardIcon tooltipPrompt="Registrations " iconType="table" route="/registrations" id={id} />
            </EventCardLinkGroup>
        )
    } else {
        return (
            <EventCardLinkGroup>
                <EventCardIcon tooltipPrompt="Create Form" iconType="edit" route="/events" id={id} />
            </EventCardLinkGroup>
        )
    }
};

const EventCard = (props) => {
    const {title, description } = props;
        return (
            <FadeIn>
                <Card onClick={() => console.log(props)} style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <Typography>
                        <Title strong>{title}</Title>
                    </Typography>
                    <Typography>
                        <Paragraph type="secondary">{description}</Paragraph>
                    </Typography>
                    {renderEventCards(props)}
                </Card>
            </FadeIn>
        );
};

export default EventCard;