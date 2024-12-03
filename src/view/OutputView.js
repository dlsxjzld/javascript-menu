const { Console } = require('@woowacourse/mission-utils');
const MESSAGE = require('../constants/message.js');

const OutputView = {
  printInstruction() {
    Console.print(MESSAGE.INSTRUCTION);
  },

  printResult(result) {
    Console.print(result);
  },

  printAllMenuList({ header, categories, allCoachMenuList }) {
    const delimiter = ' | ';
    const output = [
      `[ ${header.join(delimiter)} ]`,
      `[ ${categories.join(delimiter)} ]`,
      ...allCoachMenuList.map((row) => `[ ${row.join(delimiter)} ]`),
    ].join('\n');
    Console.print(output);
    Console.print('\n추천을 완료했습니다.\n');
    Console.close();
  },
};

module.exports = OutputView;
