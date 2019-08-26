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

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  getTriviaQuestion() {
    _triviaApi.get()
      .then(res => {
        let question = new Question(res.data[0])
        _setState("question", question)
      })
  }
}
