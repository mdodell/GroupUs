import React from 'react';

import { Card, Typography } from 'antd';

import EventCardLink from './EventCardLink';

import { FadeIn } from '../StyledComponents';

const { Title, Paragraph } = Typography;

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
};

const EventCard = (props) => {
    const {title, description } = props;
    return (
           <FadeIn>
                <Card onClick={() => console.log(props)} style={{width: "100%", height: "300px", marginBottom: "16px"}}>
                    <Typography>
                        <Title>{title}</Title>
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