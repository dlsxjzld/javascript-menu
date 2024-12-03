const { Random } = require('@woowacourse/mission-utils');

class RecommendList {
  constructor(sample) {
    this.weekCategories = ['카테고리'];
    this.sample = sample;
    this.pickCategory();
  }

  pickCategory() {
    if (this.weekCategories.length >= 6) {
      return;
    }
    const categories = Object.keys(this.sample);
    const category = categories[Random.pickNumberInRange(1, 5) - 1];
    const categoryCount = this.weekCategories.filter(
      (weekCategory) => weekCategory === category,
    ).length;
    if (categoryCount < 2) {
      this.weekCategories.push(category);
    }
    this.pickCategory();
  }

  getWeekCategories() {
    return this.weekCategories;
  }
}

module.exports = RecommendList;
