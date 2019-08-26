import TriviaService from "../Services/TriviaServices.js";
import Question from "../Models/Questions.js";

let _triviaService = new TriviaService()

function _draw() {
  let question = _triviaService.Question
  document.getElementById("question").innerHTML = question.Template
}

function _drawAnswer() {
  let answer = _triviaService.Question
  document.getElementById("answer").innerHTML = answer.answerTemplate
}

export default class triviaController {
  constructor() {
    _triviaService.addSubscriber("question", _draw)
    _triviaService.getTriviaQuestion()
  }

  showAnswer() {
    _drawAnswer()
  }
}