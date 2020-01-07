import Question from "../Models/Questions.js"

let _state = {
  question: []
}

let _subscribers = {
  question: []
}

function _setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn());
}

// @ts-ignore
let _triviaApi = axios.create({
  baseURL: "http://jservice.io/api/clues"
})


export default class TriviaServices {
  get Question() {
    return _state.question
  }

  get Answer() {
    return _state.question
  }

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  outcome(answer) {
    let questionAnswer = _state.question.answer
    if (questionAnswer == answer) {
      return "Correct!"
    } else return "Sorry wrong answer, no points awarded. Press Next Question to try again."
  }

  getTriviaQuestion() {
    _triviaApi.get()
      .then(res => {
        let question = new Question(res.data[Math.floor(Math.random() * 100)])
        _setState("question", question)
      })
  }

  getNewTriviaQuestion() {
    _triviaApi.get()
      .then(res => {
        let question = new Question(res.data[Math.floor(Math.random() * 100)]);
        _setState("question", question)
      })
  }
}
