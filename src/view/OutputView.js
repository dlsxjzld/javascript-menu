import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message.js';

export const OutputView = {
  printResult(result) {
    Console.print(result);
  },

  printMenuInstruction() {
    Console.print(MESSAGE.MENU_INSTRUCTION);
  },

  printMenuResultInstruction() {
    Console.print(MESSAGE.MENU_RESULT_INSTRUCTION);
  },

  printMenuRecommendFinish() {
    Console.print(MESSAGE.FINISH_RECOMMEND);
  },

  printMenuResult({ week, categories, coaches }) {
    this.printMenuResultInstruction();
    this.printResult(week);
    this.printResult(categories);
    coaches.forEach((coach) => {
      this.printResult(coach);
    });
    this.printResult('');
    this.printMenuRecommendFinish();
  },
};
