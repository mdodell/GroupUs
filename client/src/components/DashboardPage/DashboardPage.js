    import React, { Component } from 'react';

    import EventCard from '../EventCard/EventCard';

    import { AddEventModal } from '../AddEventModal/AddEventModal';

    import { DisplayEventsContainer, AddEventButton } from "../StyledComponents";

    import { Row, Col, Icon, message } from 'antd';

    import { connect } from 'react-redux';

    import { fetchUser } from '../../actions';

    import axios from 'axios';

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

    class DashBoardPage extends Component {

        state = {
            addEventModalVisible: false
        };

        renderEventCards = (events) => {
            return events.map((event) =>
                <Col key={event.eventId} style={{display: "flex"}} span={7}>
                    <EventCard title={event.eventTitle} description={event.description}/>
                </Col>)
        };

        showModal = () => {
            this.setState({
                addEventModalVisible: true
            });
        };

        handleModalCreate = async () => {
            const { form } = this.formRef.props;
            const formFields = form.getFieldsValue();

            const newEvent = {
                title: formFields.title,
                description: formFields.description,
                fromDate: formFields.datePicker[0].toDate().toISOString(),
                toDate: formFields.datePicker[1].toDate().toISOString(),
                dateSubmitted: Date.now(),
                userId: this.props.currUser.user.userId
            };

            message.success(`Created a new event with the title of: '${newEvent.title}'!`);

            await axios.post('/event/createEvent', newEvent)
                .then((response) => console.log(response))
                .catch(error => console.log(error));

            console.log(newEvent);

            form.resetFields();
            this.props.fetchUser();
            this.setState({
                addEventModalVisible: false
            });
        };

        handleModalCancel = () => {
            console.log("Canceled cancel modal!");
            const { form } = this.formRef.props;

            form.resetFields();

            this.setState({
                addEventModalVisible: false
            });
        };

        saveFormRef = (formRef) => {
            this.formRef = formRef;
            console.log(this.formRef);
        };

        render(){
            if(this.props.currUser != null) {
                console.log(this.props.currUser.user.events);
            }
            return (
                <DisplayEventsContainer>
                    <Row gutter={2} justify="space-around" type="flex">
                        {this.renderEventCards(events)}
                    </Row>
                    <AddEventButton onClick={this.showModal}>
                        <Icon type="plus" />
                    </AddEventButton>
                    <AddEventModal
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.addEventModalVisible}
                      onCreate={this.handleModalCreate}
                      onCancel={this.handleModalCancel}
                    />
                </DisplayEventsContainer>
            )
        }

    };

    const mapStateToProps = state => {
        return {
            currUser: state.currUser
        };
    };


    export default connect(mapStateToProps, { fetchUser })(DashBoardPage);