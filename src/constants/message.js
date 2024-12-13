export const MESSAGE = {
  MENU_INSTRUCTION: '점심 메뉴 추천을 시작합니다.\n',
  ASK_COACH_NAME: '코치의 이름을 입력해 주세요. (, 로 구분)\n',
  ASK_CANT_EAT: (coach) => `${coach}(이)가 못 먹는 메뉴를 입력해 주세요.\n`,
  MENU_RESULT_INSTRUCTION: '메뉴 추천 결과입니다.',
  FINISH_RECOMMEND: '추천을 완료했습니다.',
};

export const ERROR_MESSAGE = {
  INVALID: '유효하지 않은 입력입니다.',
  INVALID_EMPTY_STRING: '빈 문자열은 안됩니다.',
  INVALID_COACH_NAME_LENGTH: '코치의 이름은 최소 2글자, 최대 4글자입니다.',
  INVALID_COACH_COUNT: '코치는 최소 2명 이상 입력해야 합니다.',
  INVALID_DUPLICATE_NAME: '중복된 이름은 안됩니다.',
  INVALID_MENU: '존재하지 않는 메뉴입니다.',
  INVALID_MENU_COUNT: '못 먹는 메뉴는 0~2개 입니다.',
  INVALID_DUPLICATE_MENU: '중복된 음식은 안됩니다.',
};
