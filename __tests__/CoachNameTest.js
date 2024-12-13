import {
  isEmptyString,
  checkCoachesNameLength,
  checkCoachesCount,
  checkDuplicateCoach,
  validateCoaches,
} from '../src/validation/validateFunctions.js';

describe('코치 이름 검증 테스트', () => {
  test('빈 문자열 예외 테스트', () => {
    expect(() => {
      isEmptyString('');
    }).toThrow('[ERROR]');
    expect(() => {
      isEmptyString('e ');
    }).not.toThrow('[ERROR]');
  });
  test('코치 이름 길이 예외 테스트', () => {
    expect(() => {
      checkCoachesNameLength('1');
    }).toThrow('[ERROR]');
    expect(() => {
      checkCoachesNameLength('12345');
    }).toThrow('[ERROR]');
    expect(() => {
      checkCoachesNameLength('12');
    }).not.toThrow('[ERROR]');
    expect(() => {
      checkCoachesNameLength('1234');
    }).not.toThrow('[ERROR]');
  });
  test('코치 수 예외 테스트', () => {
    expect(() => {
      checkCoachesCount('qw');
    }).toThrow('[ERROR]');
    expect(() => {
      checkCoachesCount('qw,we,er,rt,ty,yu');
    }).toThrow('[ERROR]');
    expect(() => {
      checkCoachesCount('qw,we');
    }).not.toThrow('[ERROR]');
    expect(() => {
      checkCoachesCount('qw,we,er,rt,ty');
    }).not.toThrow('[ERROR]');
  });
  test('중복되는 코치 예외 테스트', () => {
    expect(() => {
      checkDuplicateCoach('qw,qw');
    }).toThrow('[ERROR]');
    expect(() => {
      checkDuplicateCoach('qw,we');
    }).not.toThrow('[ERROR]');
  });
  test('코치 이름 테스트', () => {
    expect(() => {
      validateCoaches('qw,');
    }).toThrow('[ERROR]');
    expect(() => {
      validateCoaches('qw, e');
    }).not.toThrow('[ERROR]');
  });
});
