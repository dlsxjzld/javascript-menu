import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message.js';

export const InputView = {
  async readCoachName() {
    const input = await Console.readLineAsync(MESSAGE.ASK_COACH_NAME);
    return input;
  },

  async readCantEat(coach) {
    const input = await Console.readLineAsync(MESSAGE.ASK_CANT_EAT(coach));
    return input;
  },

  async readUserInput(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};
