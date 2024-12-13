import { Random } from '@woowacourse/mission-utils';

export const SAMPLE = Object.freeze({
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안:
    '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
});

export const CATEGORIES = Object.keys(SAMPLE);
const menuForCategoryList = {};
CATEGORIES.forEach((key) => {
  menuForCategoryList[key] = SAMPLE[key].split(', ');
});

export default class RecommendPlanner {
  week = ['구분', '월요일', '화요일', '수요일', '목요일', '금요일'];

  categories = ['카테고리'];

  foodForCoaches = {};

  constructor(coaches, coachesCantEat) {
    this.coachesCantEat = coachesCantEat;
    this.coaches = coaches;
    coaches.forEach((coach) => {
      this.foodForCoaches[coach] = [`${coach}`];
    });
  }

  start() {
    this.pickCategory();
  }

  pickCategory() {
    if (this.categories.length === this.week.length) {
      return;
    }
    const category = CATEGORIES[Random.pickNumberInRange(1, 5) - 1];
    const categoryCount = this.categories.filter(
      (myCategory) => myCategory === category,
    ).length;
    if (categoryCount < 2) {
      const coachCount = 0;
      this.categories.push(category);
      this.pushMenuToAllCoach(category, coachCount);
    }
    this.pickCategory();
  }

  pushMenuToAllCoach(category, coachCount) {
    if (coachCount === this.coaches.length) {
      return;
    }
    const coach = this.coaches[coachCount];
    this.pushMenuToCoach(coach, category);

    this.pushMenuToAllCoach(category, coachCount + 1);
  }

  pushMenuToCoach(coach, category) {
    const cantEatList = this.coachesCantEat[coach];
    const menu = this.pickMenu(category);

    if (
      cantEatList.includes(menu) ||
      this.foodForCoaches[coach].includes(menu)
    ) {
      this.pushMenuToCoach(coach, category);
      return;
    }
    this.foodForCoaches[coach].push(menu);
  }

  pickMenu(category) {
    const menusIndex = Array.from(
      { length: menuForCategoryList[category].length },
      (_, idx) => idx + 1,
    );

    const menuIndex = Random.shuffle(menusIndex)[0] - 1;
    const menu = menuForCategoryList[category][menuIndex];
    return menu;
  }

  getResult() {
    return {
      week: `[ ${this.week.join(' | ')} ]`,
      categories: `[ ${this.categories.join(' | ')} ]`,
      coaches: Object.values(this.foodForCoaches).map(
        (coach) => `[ ${coach.join(' | ')} ]`,
      ),
    };
  }
}
