import React from "react";
import Answers from "./Answers";

class QsBlock extends React.Component{
    render(){
        let options = this.props.allAnswers.map(option=>{
            return <Answers ansId={this.props.idParam} gameOver={this.props.gameOver} onclickchild={this.props.onclick} response={this.props.response} correctAns={this.props.correctAns} answer={option}/>
        })
        return(
            <div className="quizContainer">
                <div className="question">{this.props.question}</div>
                <div className="options">
                    {options}
                </div>

            </div>
        )
    }
}

export default QsBlock;