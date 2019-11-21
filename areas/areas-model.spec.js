const db = require('../data/dbConfig.js');

const { find, findById, add } = require('./areas-model.js');

describe("areas model", () => {
  describe("find", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should return an array', async () => {
      const areas = await find();
      expect(Array.isArray(areas)).toBe(true);
    });
    

    it('should return a name field', async () => {
      await add({ name: "areaPlace" });
      const areas = await find()
      expect(areas[0].name).toBe("areaPlace");
    });

  });

  describe("add", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should add an area', async () => {
      await add({ name: "MyVeryOwnArea" });
      const areas = await db('areas');
      expect(areas).toHaveLength(1);
    });

    it('should return an area object', async () => {
      const area = await add({ name: "secretArea" });
      expect(area.id).toBe(1);
    })

  });

  describe("findById", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should return an area object', async () => {
      const { id } = await add({ name: "mySplace" });
      const area = await findById(id);
      expect(area.id).toBeDefined();
    });

    it('should return the area with the id specified', async () => {
      const { id } = await add({ name: "mySplace" });
      const area = await findById(id);
      expect(area.id).toBe(id);
    });

  });
});