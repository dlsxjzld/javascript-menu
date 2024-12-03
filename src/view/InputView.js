const { Console } = require('@woowacourse/mission-utils');

const InputView = {
  readUserInput(message, callback) {
    Console.readLine(message, callback);
  },
};

module.exports = InputView;
