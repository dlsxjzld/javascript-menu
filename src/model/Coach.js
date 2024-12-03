const { Random } = require('@woowacourse/mission-utils');

class Coach {
  constructor(name, sample) {
    this.name = name;
    this.sample = {};
    this.convertSample(sample);
    this.menuList = [];
  }

  addFilter(foodList) {
    this.filterFood = foodList;
  }

  convertSample(sample) {
    const keys = Object.keys(sample);
    const sampleValues = Object.values(sample).map((row) => row.split(', '));
    keys.forEach((key, index) => {
      this.sample[key] = sampleValues[index];
    });
  }

  addMenu(dayOfCategory) {
    const candidateFoods = this.sample[dayOfCategory].map((_, idx) => idx + 1);

    const menuIndex = Random.shuffle(candidateFoods)[0] - 1;

    const menu = this.sample[dayOfCategory][menuIndex];

    if (this.filterFood.includes(menu) || this.menuList.includes(menu)) {
      this.addMenu(dayOfCategory);
      return;
    }
    this.menuList.push(menu);
  }

  getMenuList() {
    return [this.name, ...this.menuList];
  }
}

module.exports = Coach;
