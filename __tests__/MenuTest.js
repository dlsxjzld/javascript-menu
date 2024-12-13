import {
  checkFoodsCount,
  checkSampleMenu,
  checkDuplicateMenu,
  validateCantEatFoods,
} from '../src/validation/validateFunctions.js';

describe('코치 이름 검증 테스트', () => {
  test('메뉴 수 예외 테스트', () => {
    expect(() => {
      checkFoodsCount('마파두부,');
    }).toThrow('[ERROR]');
    expect(() => {
      checkFoodsCount('마파두부,,파인애플 볶음밥');
    }).toThrow('[ERROR]');
    expect(() => {
      checkFoodsCount('');
    }).not.toThrow('[ERROR]');
    expect(() => {
      checkFoodsCount('마파두부,파인애플 볶음밥');
    }).not.toThrow('[ERROR]');
  });
  test('메뉴가 존재하는지 예외 테스트', () => {
    expect(() => {
      checkSampleMenu('마파두');
    }).toThrow('[ERROR]');
    expect(() => {
      checkSampleMenu('마파두부,');
    }).toThrow('[ERROR]');
    expect(() => {
      checkSampleMenu('');
    }).not.toThrow('[ERROR]');
    expect(() => {
      checkSampleMenu('마파두부');
    }).not.toThrow('[ERROR]');
    expect(() => {
      checkSampleMenu('마파두부,파인애플 볶음밥');
    }).not.toThrow('[ERROR]');
  });
  test('중복되는 메뉴 예외 테스트', () => {
    expect(() => {
      checkDuplicateMenu('마파두부,마파두부');
    }).toThrow('[ERROR]');
    expect(() => {
      checkDuplicateMenu('마파두부,파인애플 볶음밥');
    }).not.toThrow('[ERROR]');
  });
  test('메뉴 테스트', () => {
    expect(() => {
      validateCantEatFoods('마파두부,');
    }).toThrow('[ERROR]');
    expect(() => {
      validateCantEatFoods('마파두부,파인애플 볶음밥');
    }).not.toThrow('[ERROR]');
  });
});
