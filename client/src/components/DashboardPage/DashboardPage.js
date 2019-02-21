import React from 'react';

import EventCard from '../EventCard/EventCard'

import { DisplayEventsContainer } from "../StyledComponents";

import { Row, Col} from 'antd';


const events = [
    {
        eventId: 1,
        eventTitle: "Event Title 1",
        description: "This is the description for Mitchell's super lit birthday party yeet!"
    },
    {
        eventId: 2,
        eventTitle: "Event Title 2",
        description: "This is the description for R's super lit birthday party yeet!"
    },
    {
        eventId: 3,
        eventTitle: "Event Title 3",
        description: "This is the description for Adam's super lit birthday party yeet!"
    },
    {
        eventId: 4,
        eventTitle: "Event Title 1",
        description: "This is the description for Mitchell's super lit birthday party yeet!This is the description for Mitchell's super lit birthday party yeet!"
    },
    {
        eventId: 5,
        eventTitle: "Event Title 2",
        description: "This is the description for R's super lit birthday party yeet!"
    },
    {
        eventId: 6,
        eventTitle: "Event Title 3",
        description: "This is the description for Adam's super lit birthday party yeet!"
    },

];

const renderEventCards = (events) => {
    return events.map((event) =>
        <Col key={event.eventId} style={{display: "flex"}} span={7}>
            <EventCard title={event.eventTitle} description={event.description}/>
        </Col>)
};


const DashBoardPage = () => {
    return (
        <DisplayEventsContainer>
            <Row gutter={2} justify="space-around" type="flex">
                {renderEventCards(events)}
            </Row>
        </DisplayEventsContainer>
    )

};

export default DashBoardPage;