const { Console } = require('@woowacourse/mission-utils');

const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(
    input.includes(' '),
    '잘못된 입력입니다. 다시 입력해 주세요. 공백은 안됩니다.',
  );
};
const splitInput = (input) =>
  input.split(',').map((value) => value.slice(1, -1).split('-'));

const hasProduct = (input, productList) => {
  const productNameList = splitInput(input).map((inputs) => inputs[0]);
  toThrowNewError(
    productNameList.some(
      (productName) => productList.hasProduct(productName) === false,
    ),
    '존재하지 않는 상품입니다. 다시 입력해 주세요. ex)[콜라-2],[사이다-1]',
  );
};

const hasInventory = (input, productList) => {
  const inventoryList = splitInput(input);
  toThrowNewError(
    inventoryList.some(
      ([productName, inventory]) =>
        productList.hasInventory(productName, Number(inventory)) === false,
    ),
    '재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요. ex)[콜라-2],[사이다-1]',
  );
};

const isAllPositiveNumberType = (input) => {
  const inventory = splitInput(input).map((inputs) => Number(inputs[1]));
  toThrowNewError(
    inventory.some(
      (number) => Number.isInteger(number) === false || number <= 0,
    ),
    '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요. ex)[콜라-2],[사이다-1]',
  );
};

const isRightFormSquareBracket = (input) => {
  toThrowNewError(
    input
      .split(',')
      .some((value) => !value.startsWith('[') || !value.endsWith(']')),
    '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요. ex)[콜라-2],[사이다-1]',
  );
};

const getCharCount = (input, targetChar) => {
  let count = 0;
  for (let i = 0; i < input.length; i += 1) {
    if (targetChar === input[i]) {
      count += 1;
    }
  }
  return count;
};

const hasBracketAndDashCount = (input) => {
  const leftSquareBracket = getCharCount(input, '[');
  const rightSquareBracket = getCharCount(input, ']');
  const dash = getCharCount(input, '-');
  toThrowNewError(
    leftSquareBracket !== 1 || rightSquareBracket !== 1 || dash !== 1,
    '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  );
};

const checkCharCount = (input) => {
  input.split(',').some(hasBracketAndDashCount);
};

const checkComma = (input) => {
  const product = input.split(',').filter(Boolean).length;
  const comma = getCharCount(input, ',');
  toThrowNewError(
    product - 1 !== comma,
    '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  );
};

const readItem = (input, productList) => {
  hasEmptySpace(input);
  isRightFormSquareBracket(input);
  checkCharCount(input);
  checkComma(input);
  isAllPositiveNumberType(input);
  hasProduct(input, productList);
  hasInventory(input, productList);
};

const check = (input, validate, rest) => {
  try {
    validate(input, rest);
    return true;
  } catch (error) {
    Console.print(error.message);
    return false;
  }
};

exports.check = check;
exports.readItem = readItem;

module.exports = exports;
