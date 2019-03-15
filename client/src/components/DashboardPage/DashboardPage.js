    import React, { Component } from 'react';

    import EventCard from '../EventCard/EventCard';

    import { AddEventModal } from '../AddEventModal/AddEventModal';

    import { DisplayEventsContainer, AddEventButton } from "../StyledComponents";

    import { Row, Col, Icon } from 'antd';

    import { connect } from 'react-redux';

    import { fetchUserAndEvents, addEventDispatch } from '../../actions';

    import axios from 'axios';

    class DashBoardPage extends Component {

        state = {
            addEventModalVisible: false
        };

        renderEventCards = (arrayOfEvents) => {
            return arrayOfEvents.map((event) =>
                <Col key={event.newEvent._id} style={{display: "flex"}} span={7}>
                    <EventCard id={event.newEvent._id} title={event.newEvent.title} description={event.newEvent.description}/>
                </Col>
            )
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

            await axios.post('/event/createEvent', newEvent)
                .then((response) => {
                    this.props.addEventDispatch(response.data); //need to dispatch here, don't have the newEventId
                })
                .catch(error => console.log(error));
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
        };

        render(){
                return (
                    <div>
                        <AddEventButton onClick={this.showModal}>
                            <Icon type="plus" />
                        </AddEventButton>
                        <DisplayEventsContainer>
                            <Row justify="space-around" type="flex">
                                {this.renderEventCards(this.props.listOfEvents.events)}
                             </Row>
                            <AddEventModal
                                 wrappedComponentRef={this.saveFormRef}
                                 visible={this.state.addEventModalVisible}
                                 onCreate={this.handleModalCreate}
                                 onCancel={this.handleModalCancel}
                             />
                        </DisplayEventsContainer>
                    </div>
                )
        }
    };

    const mapStateToProps = state => {
        return {
            currUser: state.currUser,
            listOfEvents: state.events
        };
    };


    export default connect(mapStateToProps, { fetchUserAndEvents, addEventDispatch })(DashBoardPage);