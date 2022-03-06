import React from "react";
class Answers extends React.Component{
    
    render(){
        let className;
        if(this.props.gameOver&&(this.props.response === this.props.answer)){
            console.log("showing results")
            className = (this.props.correctAns ===this.props.response) ? "ans correct":"ans wrong"
        }else{
            className = this.props.answer === this.props.response?"ans selected":"ans"
        }
        return(
            <div onClick={()=> this.props.onclickchild(this.props.ansId,this.props.answer)} className = {className} >{this.props.answer}</div>
        )
    }

}


export default Answers;