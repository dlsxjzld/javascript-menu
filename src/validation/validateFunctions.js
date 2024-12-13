import { SAMPLE } from '../model/RecommendPlanner.js';
import { CONSTANT } from '../constants/constant.js';
import { ERROR_MESSAGE } from '../constants/message.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    `${ERROR_MESSAGE.INVALID} ${ERROR_MESSAGE.INVALID_EMPTY_STRING}`,
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

const checkDuplicateCoach = (input) => {
  const originCoaches = input.split(',').filter(Boolean);
  const setCoaches = new Set(originCoaches);
  toThrowNewError(
    originCoaches.length !== setCoaches.size,
    ERROR_MESSAGE.INVALID_DUPLICATE_NAME,
  );
};

export const validateCoaches = (input) => {
  isEmptyString(input);
  checkCoachesNameLength(input);
  checkCoachesCount(input);
  checkDuplicateCoach(input);
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

const checkDuplicateMenu = (input) => {
  if (input === '') return;
  const originFoods = input.split(',');
  const setFoods = new Set(originFoods);
  toThrowNewError(
    originFoods.length !== setFoods.size,
    ERROR_MESSAGE.INVALID_DUPLICATE_MENU,
  );
};

export const validateCantEatFoods = (input) => {
  checkFoodsCount(input);
  checkSampleMenu(input);
  checkDuplicateMenu(input);
};
