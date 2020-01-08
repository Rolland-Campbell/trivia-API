import Question from "../Models/Questions.js"

let _state = {
  question: [],
  bank: 0
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
  baseURL: "//jservice.io/api/clues"
})

let host = document.querySelector(".hostPic")

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
    let points = _state.question.value
    if (questionAnswer.toLowerCase().includes(`${answer}`)) {
      _state.bank += points
      host.classList.replace('hostPic', 'correctPic')
      return "Correct! You won $" + _state.question.value + ", Press Next Question to play more!"
    } else host.classList.replace('hostPic', 'wrongPic')
    return "Sorry wrong answer, no points awarded. Press Next Question to try again."
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
        host.classList.replace('wrongPic', 'hostPic')
        host.classList.replace('correctPic', 'hostPic')
      })
  }

  showBank() {
    return _state.bank
  }
}
