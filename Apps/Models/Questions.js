export default class Question {
  constructor(data) {
    console.log(data)
    this.value = data.value
    this.category = data.category.title
    this.question = data.question
    this.answer = data.answer
  }

  get Template() {
    return `
    "The category is <b>${this.category} </b>"<br>
        "The question is worth <b>$${this.value}</b>"<br>
        "${this.question}"
        `
  }

  get answerTemplate() {
    return `
    "The answer is <b>${this.answer}</b>
    `
  }
}