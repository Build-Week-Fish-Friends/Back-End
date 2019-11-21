const db = require('../data/dbConfig.js');

const { add, find, findBy, findById, update, remove } = require('./log-model.js');

// call users.add()
const users = require('../users/user-model.js');

// call areas.add()
const areas = require('../areas/areas-model.js');

describe("logs model", () => {
  describe("add", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it('should add a log', async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });
      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });
      const logs = await db('logs');
      expect(logs).toHaveLength(1);
    });

    it('should return the provided log', async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      let log = await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });
      expect(log.name).toBe('Fishing Spot');
      expect(log.id).toBeDefined();

      log = await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });
      expect(log.name).toBe('Secret Fishing Spot');
      expect(log.id).toBeDefined();
    });
  });

  describe("find", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it("should return an array", async () => {

      const log = await find();

      expect(Array.isArray(log)).toBe(true);
    });

    it("should return the correct information", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await find();

      expect(log).toHaveLength(2);
      expect(log[0].name).toBe('Fishing Spot');
      expect(log[1].name).toBe('Secret Fishing Spot');
    });
  });

  describe("findBy", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it("should return an array", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await findBy({
        name: "Fishing Spot"
      });

      expect(Array.isArray(log)).toBe(true);
    });

    it("should return the correct information", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await findBy({
        user_id: 1
      });

      expect(log).toHaveLength(2);
      expect(log[0].name).toBe('Fishing Spot');
    });

    
  });

  describe("findById", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it("should return an object", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await findById(1);

      expect(log.id).toBeDefined();
      expect(log.id).toBe(1);
    });

    it("should return the correct information", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await findById(2);

      expect(log.name).toBe("Secret Fishing Spot");
    });
  });

  describe("update", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it("should return the updated log", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await update(2, {
        name: "Most Secret Fishing Spot",
      });

      expect(log.id).toBe(2);
    });

    it("should...", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await add({
        name: "Secret Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const log = await update(2, {
        name: "Most Secret Fishing Spot",
      });

      expect(log.name).toBe("Most Secret Fishing Spot");
    });
  });

  describe("remove", () => {
    beforeEach(async () => {
      await db('logs').truncate();
      await db('areas').truncate();
      await db('users').truncate();
    });

    it("should remove the record", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      await remove(1);

      const logs = await db('logs');

      expect(logs).toHaveLength(0);
    });

    it("should return the number of records destroyed", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await areas.add({ name: "MyVeryOwnArea" });

      await add({
        name: "Fishing Spot",
        user_id: 1,
        area_id: 1
      });

      const removed = await remove(1);

      expect(removed).toBe(1);
    });
  });
})