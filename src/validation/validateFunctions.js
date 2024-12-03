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

const MIN_NAME_RANGE = 2;
const MAX_NAME_RANGE = 4;
const checkNameLength = (input) => {
  const coaches = input.split(',').filter(Boolean);
  toThrowNewError(
    coaches.some(
      (coach) => coach.length < MIN_NAME_RANGE || coach.length > MAX_NAME_RANGE,
    ),
    '코치의 이름은 최소 2글자, 최대 4글자만 가능합니다.',
  );
};

const MIN_COUNT_RANGE = 2;
const MAX_COUNT_RANGE = 5;

const checkCoachCount = (input) => {
  const coaches = input.split(',');
  toThrowNewError(
    coaches.length < MIN_COUNT_RANGE || coaches.length > MAX_COUNT_RANGE,
    '코치는 최소 2명, 최대 5명까지 가능합니다.',
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

const checkComma = (input) => {
  const coaches = input.split(',').filter(Boolean).length;
  const comma = getCharCount(input, ',');
  toThrowNewError(
    coaches - 1 !== comma,
    '올바르지 않은 형식으로 입력했습니다. ,의 수는 코치의 수보다 1 적어야 합니다.',
  );
};

const readCoach = (input) => {
  hasEmptySpace(input);
  checkNameLength(input);
  checkCoachCount(input);
  checkComma(input);
};

const checkFoodCount = (input) => {
  if (input === '') return;
  const count = input.split(',').filter(Boolean).length;
  toThrowNewError(
    !(count >= 0 && count <= 2),
    '못 먹는 음식은 0~2개만 가능합니다.',
  );
};

const checkCommaForFood = (input) => {
  const foods = input.split(',').filter(Boolean).length;
  const comma = getCharCount(input, ',');
  toThrowNewError(
    foods > 0 && foods - 1 !== comma,
    '올바르지 않은 형식으로 입력했습니다. ,의 수는 코치의 수보다 1 적어야 합니다.',
  );
};

const duplicateFoods = (input) => {
  const foods = input.split(',').filter(Boolean);
  const setFoods = new Set(foods);
  toThrowNewError(
    foods.length !== setFoods.size,
    '중복된 음식을 입력했습니다.',
  );
};

const hasFoods = (input, SAMPLE) => {
  const foods = input.split(',').filter(Boolean);
  const foodList = Object.values(SAMPLE)
    .map((row) => row.split(', '))
    .flat();
  toThrowNewError(
    foods.some((food) => !foodList.includes(food)),
    '없는 음식을 입력했습니다. 빈값 혹은 음식을 입력해주세요.',
  );
};

const readFoods = (input, SAMPLE) => {
  hasEmptySpace(input);
  checkCommaForFood(input);
  checkFoodCount(input);
  duplicateFoods(input);
  hasFoods(input, SAMPLE);
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
exports.readCoach = readCoach;
exports.readFoods = readFoods;

module.exports = exports;
