    import React, { Component } from 'react';

    import {
        Modal, Form, Input, DatePicker, message, Radio } from 'antd';

    const { RangePicker } = DatePicker;

    const RadioGroup = Radio.Group;

    export const AddEventModal = Form.create({name: 'create_event_modal'})(
        class extends Component {

            handleSubmit = (e) => {
                e.preventDefault();

                const { form, onCreate } = this.props;

                form.validateFields((err, values) => {
                    if(!err) {
                        message.success(`Created an event titled: ${values.title}`);
                        console.log(values);
                        onCreate(values);
                    } else {
                        message.error('Failed to create an event!');
                    }
                })
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
                            <Form.Item label="Schemas">
                                {getFieldDecorator('schema', {
                                    rules: [{ required: true, message: 'Please select a schema' }],
                                    initialValue: "default"
                                })(
                                    <RadioGroup>
                                        <Radio value={"default"}>Default</Radio>
                                        <Radio value={"conference"}>Conference</Radio>
                                        <Radio value={"create-new"}>Create New Schema</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                            <Form.Item label="Date Range" className="collection-create-form_last-form-item">
                                {getFieldDecorator('datePicker', {
                                    rules: [{ required: true, message: 'Please enter two dates' }],
                                })(
                                    <RangePicker
                                        showTime
                                    />
                                )}

                            </Form.Item>
                        </Form>
                    </Modal>
                )
            }
        }
    );