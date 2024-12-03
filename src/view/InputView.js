const { Console } = require('@woowacourse/mission-utils');
const { check } = require('../validation/validateFunctions.js');

const InputView = {
  async readUserInput(message, validation, rest) {
    const input = await Console.readLineAsync(message);
    if (check(input, validation, rest)) {
      return input;
    }
    return this.readUserInput(message, validation, rest);
  },
};
module.exports = InputView;
