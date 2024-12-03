const InputView = require('./view/InputView.js');
const OutputView = require('./view/OutputView.js');
const MESSAGE = require('./constants/message.js');
const {
  readCoach,
  check,
  readFoods,
} = require('./validation/validateFunctions.js');
const Coach = require('./model/Coach.js');
const RecommendList = require('./model/RecommendList.js');

const SAMPLE = Object.freeze({
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안:
    '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
});

class App {
  #coachList;

  play() {
    OutputView.printInstruction();
    this.requestCoachNames();
  }

  requestCoachNames() {
    InputView.readUserInput(MESSAGE.COACH_INPUT, (input) => {
      if (check(input, readCoach)) {
        this.saveCoachNames(input);

        return;
      }
      this.requestCoachNames();
    });
  }

  saveCoachNames(coachNames) {
    this.coachNames = coachNames.split(',');
    this.#coachList = coachNames
      .split(',')
      .map((name) => new Coach(name, { ...SAMPLE }));
    OutputView.printResult('');
    this.askFoodForCoach();
  }

  askFoodForCoach(start = 0) {
    if (start === this.coachNames.length) {
      this.recommendMenu();
      return;
    }
    const coach = this.coachNames[start];
    InputView.readUserInput(`${coach}${MESSAGE.ASK_FOOD_INPUT}`, (input) => {
      if (check(input, readFoods)) {
        this.saveFoodForCoach(input, coach, start);
        return;
      }
      this.askFoodForCoach(start);
    });
  }

  saveFoodForCoach(foods, coachName, start) {
    const foodList = foods.split(',').filter(Boolean);
    const currentCoach = this.#coachList.find(
      (coach) => coach.name === coachName,
    );
    currentCoach.addFilter(foodList);
    OutputView.printResult('');
    this.askFoodForCoach(start + 1);
  }

  recommendMenu() {
    OutputView.printResult(MESSAGE.MENU_INPUT);
    const recommendList = new RecommendList({ ...SAMPLE });
    const weekCategories = recommendList.getWeekCategories();
    this.pickMenuForCoaches(weekCategories);
    this.printAllMenuList(weekCategories);
  }

  pickMenuForCoaches(weekCategories) {
    this.#coachList.forEach((coach) => {
      weekCategories.slice(1).forEach((category) => {
        coach.addMenu(category);
      });
    });
  }

  printAllMenuList(weekCategories) {
    const header = ['구분', '월요일', '화요일', '수요일', '목요일', '금요일'];
    const categories = weekCategories;
    const allCoachMenuList = this.#coachList.map((coach) =>
      coach.getMenuList(),
    );
    OutputView.printAllMenuList({ header, categories, allCoachMenuList });
  }
}

module.exports = App;
