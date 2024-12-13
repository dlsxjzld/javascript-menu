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
};
