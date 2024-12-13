import { SAMPLE } from '../category.js';
import { CONSTANT } from '../constants/constant.js';
import { ERROR_MESSAGE } from '../constants/message.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(
    input.includes(' '),
    `${ERROR_MESSAGE.INVALID} 공백은 안됩니다.`,
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    `${ERROR_MESSAGE.INVALID} 빈 문자열은 안됩니다.`,
  );
};
const checkCoachesNameLength = (input) => {
  toThrowNewError(
    input
      .split(',')
      .some(
        (coach) =>
          coach.length < CONSTANT.NAME_MIN_LENGTH ||
          coach.length > CONSTANT.NAME_MAX_LENGTH,
      ),
    ERROR_MESSAGE.INVALID_COACH_NAME_LENGTH,
  );
};
const checkCoachesCount = (input) => {
  const coaches = input.split(',').filter(Boolean).length;
  toThrowNewError(
    coaches.length < CONSTANT.COACH_COUNT_MIN ||
      coaches.length > CONSTANT.COACH_COUNT_MAX,
    ERROR_MESSAGE.INVALID_COACH_NAME_LENGTH,
  );
};

export const validateCoaches = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkCoachesNameLength(input);
  checkCoachesCount(input);
};

const checkFoodsCount = (input) => {
  if (input === '') return;
  const foodsWithNoEmptyString = input.split(',').filter(Boolean).length;
  const delimiter = input.split('').filter((char) => char === ',').length;

  const foods = input.split(',').length;
  toThrowNewError(
    foodsWithNoEmptyString - 1 !== delimiter,
    ERROR_MESSAGE.INVALID_MENU_COUNT,
  );
  toThrowNewError(
    foods < CONSTANT.FOOD_COUNT_MIN || foods > CONSTANT.FOOD_COUNT_MAX,
    ERROR_MESSAGE.INVALID_MENU_COUNT,
  );
};

const checkSampleMenu = (input) => {
  if (input === '') return;
  const foods = input.split(',');
  const sampleFoods = Object.values(SAMPLE)
    .map((list) => list.split(', '))
    .flat();
  toThrowNewError(
    foods.some((food) => sampleFoods.includes(food) === false),
    ERROR_MESSAGE.INVALID_MENU,
  );
};

export const validateCantEatFoods = (input) => {
  hasEmptySpace(input);
  checkFoodsCount(input);
  checkSampleMenu(input);
};
