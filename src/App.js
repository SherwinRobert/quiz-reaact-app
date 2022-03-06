import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import QsBlock from './component/QsBlock';

class App extends React.Component{

  state = {
    answers: [],
    isGameOver: false,
    checkAns:false,
    startGame:false,
    count:0
  }

  componentDidMount(){
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      let dataId = data.results.map(e =>{
        return  {...e,id:nanoid(),allAns:this.randomiser([e.correct_answer,...e.incorrect_answers]),userResponse:""}
      })
      this.setState({
        answers: dataId
      })
    })
    .catch(error => console.log(error))
  }

  randomiser(array){
    let m,temp,randInt 
    m = array.length
    while(m){
      randInt = Math.floor(Math.random()*m--)
      temp = array[m]
      array[m] = array[randInt]
      array[randInt] = temp
    }

    return array
  }
  
  getAns = (ansId,choice) =>{
    
    this.setState((prevState)=>{
    let catchAns= prevState.answers.map( ans =>{
      return ans.id === ansId ? {...ans,userResponse:choice} : {...ans}
    })

    let proceeder = catchAns.every(answer=>{
      return answer.userResponse
    })

    return {
      answers:catchAns,
      isGameOver:proceeder
    }
    })

  }

  checkAns=()=>{
    if(this.state.checkAns){
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(response => response.json())
        .then(data =>{
      console.log(data)
      let dataId = data.results.map(e =>{
        return  {...e,id:nanoid(),allAns:this.randomiser([e.correct_answer,...e.incorrect_answers]),userResponse:""}
      })
      this.setState({
        answers: dataId,
        isGameOver: false,
        checkAns:false,
        count:0
      })
    })
    .catch(error => console.log(error))
    }else{
      this.setState({
        checkAns:true
      })
    }
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  startGame=()=>{
    this.setState({
      startGame:true,
    })
  }

  render(){
    let questions = this.state.answers.map(answer=>{
      return <QsBlock onclick={this.getAns} idParam={answer.id} gameOver={this.state.checkAns} correctAns={answer.correct_answer} response={answer.userResponse} question={answer.question} allAnswers = {answer.allAns} key={nanoid()}/>
    })
    return(
      <div className={this.state.startGame?"main":"main overflow"}>
        {!this.state.startGame
         ?
          <div className='headingWrapper' >
            <div className='headingDiv' >
              Quizzical
            </div>
            <button onClick={this.startGame} className='button'>Start Quiz</button>
            <div className='topCircle'></div>
            <div className='bottomCircle'></div>
          </div>
        :
          <div className='quizBlock'>
            <div className='wrapperDiv'>
              {questions}
              {this.state.isGameOver && <div className='buttonPosition'><button ref={(el) => { this.messagesEnd = el; }} onClick={this.checkAns} className="button">{this.state.checkAns?"Play again":"Check Answers"}</button></div>}
            </div>
          
          </div>
        }
        
      </div>
    )
  }
}

export default App;
