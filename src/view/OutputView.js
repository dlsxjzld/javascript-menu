const { Console } = require('@woowacourse/mission-utils');
const MESSAGE = require('../constants/message.js');

const OutputView = {
  printInstruction() {
    Console.print(MESSAGE.INSTRUCTION);
    Console.print('');
  },

  printResult(result) {
    Console.print(result);
  },
};

module.exports = OutputView;
