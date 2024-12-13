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
    coaches.length < CONSTANT.COUNT_MIN || coaches.length > CONSTANT.COUNT_MAX,
    ERROR_MESSAGE.INVALID_COACH_NAME_LENGTH,
  );
};

const checkInteger = (input) => {
  const bridgeSize = Number(input);
  toThrowNewError(
    Number.isInteger(bridgeSize) === false,
    `${ERROR_MESSAGE.INVALID} 정수만 가능합니다.`,
  );
};

export const validateCoaches = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkCoachesNameLength(input);
  checkCoachesCount(input);
};
// export const validateSomething = (input) => {
//   hasEmptySpace(input);
//   isEmptyString(input);
// };
