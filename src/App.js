import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import {
  validateCoaches,
  validateCantEatFoods,
} from './validation/validateFunctions.js';

import RecommendPlanner from './model/RecommendPlanner.js';

class App {
  async play() {
    OutputView.printMenuInstruction();
    const coaches = await this.getCoaches();
    const cantEatMenuList = await this.getCantEatMenuList(coaches);

    const recommendPlanner = new RecommendPlanner(coaches);
    recommendPlanner.start(coaches, cantEatMenuList);
    OutputView.printMenuResult(recommendPlanner.getResult());
  }

  async getCantEatMenuList(coaches) {
    const cantEatMenu = {};
    for (const coach of coaches) {
      const cantEat = await this.getCantEat(coach);
      cantEatMenu[coach] = cantEat;
    }
    return cantEatMenu;
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
