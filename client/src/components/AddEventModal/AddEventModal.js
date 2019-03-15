    import React, { Component } from 'react';

    import {
        Modal, Form, Input, DatePicker, message } from 'antd';

    const { RangePicker } = DatePicker;

    export const AddEventModal = Form.create({name: 'create_event_modal'})(
        class extends Component {

            handleSubmit = (e) => {
                e.preventDefault();

                const { form, onCreate } = this.props;

                form.validateFields((err, values) => {
                    if(!err) {
                        onCreate(values);
                    } else {
                        message.error('Failed to create an event!');
                    }
                })
            };

            handleModalCancel = () => {
                console.log("Canceled cancel modal!");
                const { form } = this.formRef.props;

                form.resetFields();

                this.setState({
                    addEventModalVisible: false
                });
            };

            render(){
                const { visible, form, onCancel } = this.props;
                const { getFieldDecorator } = form;

                return (
                    <Modal
                        visible={visible}
                        title="Create an event"
                        okText="Create"
                        onCancel={onCancel}
                        onOk={this.handleSubmit}
                    >
                        <Form layout="vertical">
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please enter a description' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item label="Date Range" className="collection-create-form_last-form-item">
                                {getFieldDecorator('datePicker', {
                                    rules: [{ required: true, message: 'Please enter two dates' }],
                                })(
                                    <RangePicker />
                                )}

                            </Form.Item>
                        </Form>
                    </Modal>
                )
            }
        }
    );