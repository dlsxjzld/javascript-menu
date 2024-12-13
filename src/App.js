import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import {
  validateCoaches,
  validateCantEatFoods,
} from './validation/validateFunctions.js';

import { MESSAGE } from './constants/message.js';

class App {
  async play() {
    OutputView.printMenuInstruction();
    const coaches = await this.getCoaches();

    const cantEatMenu = {};
    for (const coach of coaches) {
      const cantEat = await this.getCantEat(coach);
      cantEatMenu[coach] = cantEat;
    }
  }

  async getCoaches() {
    try {
      const coaches = await InputView.readCoachName();
      validateCoaches(coaches);
      return coaches.split(',');
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getCoaches();
    }
  }

  async getCantEat(coach) {
    try {
      const cantEat = await InputView.readCantEat(coach);
      validateCantEatFoods(cantEat);
      return cantEat.split(',');
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getCantEat(coach);
    }
  }
}

export default App;
