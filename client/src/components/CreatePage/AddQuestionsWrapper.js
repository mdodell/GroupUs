import React, { Component } from 'react';
import './AddQuestionsWrapper.css';
import { Typography } from 'antd';
import QuestionButton from './QuestionButton';
import TextQuestionModal from "./QuestionTypes/Text/TextQuestionModal";
import NumberQuestionModal from "./QuestionTypes/Number/NumberQuestionModal";
import DateQuestionModal from "./QuestionTypes/Date/DateQuestionModal";

const { Title } = Typography;

class AddQuestionsWrapper extends Component {

    constructor(props){
        super(props);
    }

    showTextQuestionModal = () => {
        this.textQuestionModal.showModal();
    };

    showNumberQuestionModal = () => {
        this.numberQuestionModal.showModal();
    };

    showDateQuestionModal = () => {
        this.dateQuestionModal.showModal();
    };

    render(){
        return (
            <div className="questionsContainer">
                <Typography>
                    <Title>
                        Toolbox
                    </Title>
                </Typography>
                <QuestionButton onClick={() => this.showTextQuestionModal()} iconType="font-size" questionType="Text"/>
                <QuestionButton onClick={() => this.showNumberQuestionModal()} iconType="calculator" questionType="Number"/>
                <QuestionButton onClick={() => this.showDateQuestionModal()} iconType="calendar" questionType="Date"/>
                <QuestionButton iconType="check-circle" questionType="Checkbox"/>
                <TextQuestionModal
                    wrappedComponentRef={(inst) => this.textQuestionModal = inst}
                />
                <NumberQuestionModal
                    wrappedComponentRef={(inst) => this.numberQuestionModal = inst}
                />
                <DateQuestionModal
                    wrappedComponentRef={(inst) => this.dateQuestionModal = inst}
                />
            </div>
        );
    }
};

export default AddQuestionsWrapper;