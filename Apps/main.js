import TriviaController from "./Controllers/TriviaController.js";


class App {
  constructor() {
    this.controllers = {
      triviaController: new TriviaController()
    }
  }
}

window['app'] = new App()