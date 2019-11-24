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


// * Begin Areas model tests
describe("areas model", () => {
  describe("find", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should return an array', async () => {
      const foundAreas = await areas.find();
      expect(Array.isArray(foundAreas)).toBe(true);
    });
    

    it('should return a name field', async () => {
      await areas.add({ name: "areaPlace" });
      const foundAreas = await areas.find()
      expect(foundAreas[0].name).toBe("areaPlace");
    });

  });

  describe("add", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should add an area', async () => {
      await areas.add({ name: "MyVeryOwnArea" });
      const foundAreas = await db('areas');
      expect(foundAreas).toHaveLength(1);
    });

    it('should return an area object', async () => {
      const area = await areas.add({ name: "secretArea" });
      expect(area.id).toBe(1);
    })

  });

  describe("findById", () => {
    beforeEach(async () => {
      await db('areas').truncate();
    });

    it('should return an area object', async () => {
      const { id } = await areas.add({ name: "mySplace" });
      const area = await areas.findById(id);
      expect(area.id).toBeDefined();
    });

    it('should return the area with the id specified', async () => {
      const { id } = await areas.add({ name: "mySplace" });
      const area = await areas.findById(id);
      expect(area.id).toBe(id);
    });

  });
});

// * Begin user model tests
describe("users model", () => {
  describe("add", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should add a user", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      const addedUsers = await db("users");
      expect(addedUsers).toHaveLength(1);
    });

    it("should add the provided user", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });
      await users.add({
        username: "Ben",
        password: "1234"
      });

      const addedUsers = await db('users');

      expect(addedUsers).toHaveLength(2);
      expect(addedUsers[0].username).toBe("Lambda");
      expect(addedUsers[1].username).toBe("Ben");
    });

    it("should return the provided user", async () => {
      let user = await users.add({
        username: "Lambda",
        password: "1234"
      });

      expect(user.username).toBe("Lambda");
      expect(user.id).toBeDefined();

      user = await users.add({
        username: "Ben",
        password: "1234"
      });

      expect(user.username).toBe("Ben");
      expect(user.id).toBeDefined();
    });
  });

  describe("update", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should update a user", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });

      const addedUsers = await db("users");
      expect(addedUsers).toHaveLength(1);

      await users.update(1, {
        username: "Ben"
      });

      const updatedUsers = await db("users");
      expect(updatedUsers[0].username).toBe("Ben");
    });
  });

  describe("find", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should return an array", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });

      const returnedUsers = await users.find();
      expect(Array.isArray(returnedUsers)).toBe(true);
    });

    it("should return an email field", async () => {
      await users.add({
        username: "Lambda",
        password: "1234",
        email: "eee@mail.com"
      });


      const usersArray = await users.find();
      expect(usersArray[0].email).toBe("eee@mail.com");
    });
  });

  describe("findBy", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should filter correctly", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });

      const filter = { username: "Lambda" };
      const user = await users.findBy(filter);
      expect(user[0].username).toBe("Lambda");

    });

    it("should return an array", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });

      const usersArray = await users.findBy({ username: "Lambda" });
      expect(Array.isArray(usersArray)).toBe(true);
    });
  });


  describe("findById", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should return a user object", async () => {
      await users.add({
        username: "Lambda",
        password: "1234"
      });

      let user = await users.findById(1);
      expect(user.id).toBeDefined();
    });

    it("should return an object with and id that matches the id sent", async () => {
      const added = await users.add({
        username: "Lambda",
        password: "1234"
      });

      let id = added.id;
      const user = await users.findById(id);
      expect(user.id).toBe(id);
    });
  });

  describe("remove", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should remove a user", async () => {
      const { id } = await users.add({
        username: "Lambda",
        password: "1234"
      });

      let allUsers = await db('users');
      expect(allUsers).toHaveLength(1);
      await users.remove(id);
      allUsers = await db('users');
      expect(allUsers).toHaveLength(0);

    });

    it("should return the number of records deleted, always 1", async () => {

      const { id } = await users.add({
        username: "Lambda",
        password: "1234"
      });
      
      let allUsers = await db('users');
      expect(allUsers).toHaveLength(1);
      allUsers = await users.remove(id);
      expect(allUsers).toBe(1);

    });
  });
});
