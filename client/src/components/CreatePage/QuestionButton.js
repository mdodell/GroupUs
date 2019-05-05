import React from 'react';
import { Icon } from 'antd';
import './Questions.css';


const QuestionButton = (props) => {
    return (
        <div className="questionContainer" onClick={props.onClick}>
            <div className="labelContainer">
                <Icon style={{fontSize: '1.5vw', marginRight: '10px'}} type={props.iconType} />
               <h2 style={{margin: '0'}}>
                   {props.questionType}
               </h2>
            </div>
        </div>
    )
}

export default QuestionButton;