const db = require('../data/dbConfig.js');

const { add, update } = require('./user-model.js');

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
})