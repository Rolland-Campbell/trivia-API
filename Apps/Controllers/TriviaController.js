import TriviaService from "../Services/TriviaServices.js";
import Question from "../Models/Questions.js";

let _triviaService = new TriviaService()

function _draw() {
  let question = _triviaService.Question
  document.getElementById("question").innerHTML = question.Template
}

function _drawChoice(playerAnswer) {
  document.getElementById("choice").innerHTML = 'Your final answer was ' + playerAnswer + ', click the answer button to see if you are correct'
}

function _drawAnswer() {
  let answer = _triviaService.Question
  document.getElementById("answer").innerHTML = answer.answerTemplate
  let outcome = _triviaService.outcome(playerAnswer)
  document.getElementById("outcome").innerHTML = outcome
}

function _drawBank() {
  let amount = _triviaService.showBank()
  document.getElementById("bank").innerHTML = amount.toString()
}

function _clearAnswer() {
  let answer = _triviaService.Question
  document.getElementById("answer").innerHTML = ""
  document.getElementById("outcome").innerHTML = ""
  document.getElementById("choice").innerHTML = ""
}

let playerAnswer = ""

export default class triviaController {
  constructor() {
    _triviaService.addSubscriber("question", _draw)
    _triviaService.getTriviaQuestion()
    _triviaService.showBank()
  }

  showAnswer(event) {
    event.preventDefault();
    playerAnswer = event.target.answer.value
    _drawChoice(playerAnswer)
  }

  checkAnswer() {
    _drawAnswer()
    _drawBank()
  }

  nextQuestion(event) {
    event.preventDefault();
    _triviaService.getNewTriviaQuestion()
    _clearAnswer()
    _draw()
  }
}