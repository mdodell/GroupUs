import React, { Component } from 'react';

import {
    Modal, Form, Input, Switch, InputNumber
} from 'antd';

import { connect } from 'react-redux';

import { addPropertyToCurrEvent, addRequiredToCurrEvent } from '../../../../actions';
import {message} from "antd/lib/index";

const TextQuestionModal = Form.create({name: 'add_text_question_modal'})(
    class extends Component {

        constructor(props){
            super(props);
            this.state = {
                visible: false
            };
            this.onCancel = this.onCancel.bind(this);
            this.showModal = this.showModal.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        showModal(){
            this.setState({visible: true});
        }

        onCancel(){
            this.setState({visible: false});
        }

        camelCase(str){
            let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                .reduce((result, word) => result + this.capitalize(word.toLowerCase()))
            return string.charAt(0).toLowerCase() + string.slice(1)
        }

        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
        }

        onSubmit(){
            const {form } = this.props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                let key = this.camelCase(values.title);
                if(this.props.currEvent.required.includes(key)){
                    message.error("There is already a question by that name. Please rename the question!");
                } else {
                    let jsonQuestion = {
                        [key]: {
                            "type": "string",
                            "format": "date-time",
                            "title": values.title
                        }
                    };
                    if(values.switch){
                        this.props.addRequiredToCurrEvent(key);
                    }

                    this.props.addPropertyToCurrEvent(jsonQuestion);

                    form.resetFields();
                    this.onCancel();
                }
            });
        }


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={this.state.visible}
                    title="Add a Date question"
                    okText="Create"
                    onCancel={this.onCancel}
                    onOk={this.onSubmit}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of the question!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Required"
                        >
                            {getFieldDecorator('switch', {
                                valuePropName: 'checked',
                                initialValue: true,
                                rules: [{ required: true, message: 'Please check if the question should be required or not!'}]
                            })(
                                <Switch />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    });

const mapStateToProps = state => {
    return {
        currEvent: state.newEvent
    }
};

export default connect(mapStateToProps, { addPropertyToCurrEvent, addRequiredToCurrEvent })(TextQuestionModal);