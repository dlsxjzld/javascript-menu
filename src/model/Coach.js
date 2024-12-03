class Coach {
  constructor(name, sample) {
    this.name = name;
    this.sample = {}; // 객체 '카테고리': '음식들 문자열'
    this.convertSample(sample);
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
}

module.exports = Coach;
