const db = require('../data/dbConfig.js');

const { find } = require('./areas-model.js');

describe("areas model", () => {
  describe("find", () => {

    it('should return an array', async () => {
      const areas = await find();
      expect(Array.isArray(areas)).toBe(true);
    })

  });
});