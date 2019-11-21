const db = require('../data/dbConfig.js');

const { add, find, findBy, findById, update, remove } = require('./user-model.js');

describe("users model", () => {
  describe("add", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should add a user", async () => {
      await add({
        username: "Lambda",
        password: "1234"
      });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should add the provided user", async () => {
      await add({
        username: "Lambda",
        password: "1234"
      });
      await add({
        username: "Ben",
        password: "1234"
      });

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe("Lambda");
      expect(users[1].username).toBe("Ben");
    });

    it("should return the provided user", async () => {
      let user = await add({
        username: "Lambda",
        password: "1234"
      });

      expect(user.username).toBe("Lambda");
      expect(user.id).toBeDefined();

      user = await add({
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
      await add({
        username: "Lambda",
        password: "1234"
      });

      const users = await db("users");
      expect(users).toHaveLength(1);

      await update(1, {
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
      await add({
        username: "Lambda",
        password: "1234"
      });

      const users = await find();
      expect(Array.isArray(users)).toBe(true);
    });

    it("should return an email field", async () => {
      await add({
        username: "Lambda",
        password: "1234",
        email: "eee@mail.com"
      });


      const users = await find();
      expect(users[0].email).toBe("eee@mail.com");
    });
  });

  describe("findBy", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should filter correctly", async () => {
      await add({
        username: "Lambda",
        password: "1234"
      });

      const filter = { username: "Lambda" };
      const user = await findBy(filter);
      expect(user[0].username).toBe("Lambda");

    });

    it("should return an array", async () => {
      await add({
        username: "Lambda",
        password: "1234"
      });

      const users = await findBy({ username: "Lambda" });
      expect(Array.isArray(users)).toBe(true);
    });
  });


  describe("findById", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should return a user object", async () => {
      await add({
        username: "Lambda",
        password: "1234"
      });

      let user = await findById(1);
      expect(user.id).toBeDefined();
    });

    it("should return an object with and id that matches the id sent", async () => {
      const added = await add({
        username: "Lambda",
        password: "1234"
      });

      let id = added.id;
      const user = await findById(id);
      expect(user.id).toBe(id);
    });
  });

  describe("remove", () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it("should remove a user", async () => {
      const { id } = await add({
        username: "Lambda",
        password: "1234"
      });

      let users = await db('users');
      expect(users).toHaveLength(1);
      await remove(id);
      users = await db('users');
      expect(users).toHaveLength(0);

    });

    it("should return the number of records deleted, always 1", async () => {

      const { id } = await add({
        username: "Lambda",
        password: "1234"
      });
      
      let users = await db('users');
      expect(users).toHaveLength(1);
      users = await remove(id);
      expect(users).toBe(1);

    });
  });
});
