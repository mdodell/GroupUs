    import React, { Component } from 'react';

    import EventCard from '../EventCard/EventCard';

    import { AddEventModal } from '../AddEventModal/AddEventModal';

    import { DisplayEventsContainer, AddEventButton } from "../StyledComponents";

    import { Row, Col, Icon, Layout } from 'antd';

    import { connect } from 'react-redux';

    import NavBar from '../Navbar';

    import { fetchUserAndEvents, addEventDispatch } from '../../actions';

    import { defaultSchema, conferenceSchema, createNewEmptySchema } from "../../formSchemas/formSchemas";

    import axios from 'axios';

    class DashBoardPage extends Component {

        state = {
            addEventModalVisible: false
        };

        renderEventCards = (arrayOfEvents) => {
            return arrayOfEvents.map((event) =>
                <Col key={event._id} style={{display: "flex"}} span={24}>
                    <EventCard registrations={event.registrations} properties={event.properties} id={event._id} title={event.title} description={event.description}/>
                </Col>
            )
        };

        showModal = () => {
            this.setState({
                addEventModalVisible: true
            });
        };

        formSchema = (schemaOption) => {
            switch(schemaOption){
                case "default":
                    return defaultSchema;
                case "conference":
                    return conferenceSchema;
                case "create-new":
                    return createNewEmptySchema;
                default:
                    return {schema: null}
            }
        };

        handleModalCreate = async () => {
            const { form } = this.formRef.props;
            const formFields = form.getFieldsValue();
            form.resetFields();

            const schema = this.formSchema(formFields.schema);

            const newEvent = {
                title: formFields.title,
                description: formFields.description,
                fromDate: formFields.datePicker[0].toDate().toISOString(),
                toDate: formFields.datePicker[1].toDate().toISOString(),
                dateSubmitted: Date.now(),
                userId: this.props.currUser.user.userId,
                properties: schema.properties,
                required: schema.required,
                type: "object"
            };

            await axios.post('/event/createEvent', newEvent)
                .then((response) => {
                    this.props.addEventDispatch(response.data);
                })
                .catch(error => console.log(error));
            this.setState({
                addEventModalVisible: false
            });
        };


        handleModalCancel = () => {
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
                    <Layout>
                        <NavBar />
                        <AddEventButton onClick={this.showModal}>
                            <Icon type="plus" />
                        </AddEventButton>
                        <Layout>
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
                        </Layout>
                    </Layout>
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