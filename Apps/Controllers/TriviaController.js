import TriviaService from "../Services/TriviaServices.js";
import Question from "../Models/Questions.js";

let _triviaService = new TriviaService()

function _draw() {
  let question = _triviaService.Question
  document.getElementById("question").innerHTML = question.Template
}

function _drawChoice(playerAnswer) {
  document.getElementById("choice").innerHTML = 'Your final answer was ' + playerAnswer + ', click the see answer button to see if you are correct'
}

function _drawAnswer() {
  let answer = _triviaService.Question
  document.getElementById("answer").innerHTML = answer.answerTemplate
}

function _clearAnswer() {
  let answer = _triviaService.Question
  document.getElementById("answer").innerHTML = ""
}

export default class triviaController {
  constructor() {
    _triviaService.addSubscriber("question", _draw)
    _triviaService.getTriviaQuestion()
  }

  checkAnswer(event) {
    event.preventDefault();
    let playerAnswer = event.target.answer.value
    _drawChoice(playerAnswer)
  }

  showAnswer(event) {
    event.preventDefault();

    _triviaService.outcome()
    _drawAnswer()
  }

  nextQuestion(event) {
    event.preventDefault();
    _triviaService.getNewTriviaQuestion()
    _clearAnswer()
    _draw()
  }
}