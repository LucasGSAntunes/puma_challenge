const userManager = require("../../../managers/userManager");
const axios = require("../../../config/axiosConfig");

jest.mock("../../../config/axiosConfig");

describe("userManager", () => {
  beforeEach(() => {
    userManager.resetUsers();
  });

  describe("getUserGithub", () => {
    it("should fetch user data from GitHub and return formatted user object", async () => {
      const mockUser = {
        id: 1,
        name: "John Doe",
        login: "johndoe",
        avatar_url: "http://avatar.url",
        html_url: "http://html.url",
      };
      axios.get.mockResolvedValue({ data: mockUser });

      const result = await userManager.getUserGithub("johndoe");

      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        username: "johndoe",
        avatar: "http://avatar.url",
        url: "http://html.url",
        starred: false,
      });
    });

    it("should throw an error if username is not provided", async () => {
      await expect(userManager.getUserGithub()).rejects.toThrow("Username is required");
    });

    it("should throw an error if GitHub API returns status 403", async () => {
      axios.get.mockResolvedValue({ status: 403 });
      await expect(userManager.getUserGithub("johndoe")).rejects.toThrow("Failed to get user");
    });
  });

  describe("addFavoriteUser", () => {
    it("should add a new favorite user", async () => {
      const user = { username: "johndoe" };
      const result = await userManager.addFavoriteUser(user);

      const addedUser = Object.values(result).find((u) => u.user.username === "johndoe");
      expect(addedUser).toBeDefined();
      expect(addedUser.user.username).toBe("johndoe");
    });

    it("should throw an error if user already exists", async () => {
      const user = { username: "johndoe" };
      await userManager.addFavoriteUser(user);
      await expect(userManager.addFavoriteUser(user)).rejects.toThrow("User already exists");
    });

    it("should throw an error if maximum number of users is reached", async () => {
      for (let i = 0; i < 5; i++) {
        await userManager.addFavoriteUser({ username: `user${i}` });
      }
      await expect(userManager.addFavoriteUser({ username: "user6" })).rejects.toThrow("Maximum number of users reached");
    });
  });

  describe("getUserByUsername", () => {
    it("should return user by username", async () => {
      const user = { username: "johndoe" };
      await userManager.addFavoriteUser(user);
      const result = await userManager.getUserByUsername("johndoe");
      expect(result.user.username).toBe("johndoe");
    });

    it("should throw an error if user is not found", async () => {
      await expect(userManager.getUserByUsername("nonexistent")).rejects.toThrow("User not found");
    });
  });

  describe("getFavoriteUsers", () => {
    it("should return all favorite users", async () => {
      const user1 = { username: "johndoe" };
      const user2 = { username: "janedoe" };
      await userManager.addFavoriteUser(user1);
      await userManager.addFavoriteUser(user2);

      const result = await userManager.getFavoriteUsers();
      expect(result.length).toBe(2);
    });
  });

  describe("deleteFavoriteUser", () => {
    it("should delete a favorite user", async () => {
      const user = { username: "johndoe" };
      await userManager.addFavoriteUser(user);
  
      const result = await userManager.deleteFavoriteUser("johndoe");
      expect(result).toEqual({});
    });
  
    it("should throw an error if user is not found", async () => {
      await expect(userManager.deleteFavoriteUser("nonexistent")).rejects.toThrow("User not found");
    });
  
    it("should reindex users after deletion", async () => {
      const user1 = { username: "johndoe" };
      const user2 = { username: "janedoe" };
      await userManager.addFavoriteUser(user1);
      await userManager.addFavoriteUser(user2);
  
      await userManager.deleteFavoriteUser("johndoe");
      const result = await userManager.getFavoriteUsers();
      expect(result[0].user.username).toBe("janedoe");
    });
  
    it("should throw an error if username is not provided or is empty", async () => {
      await expect(userManager.deleteFavoriteUser()).rejects.toThrow("Username is required");
      await expect(userManager.deleteFavoriteUser("")).rejects.toThrow("Username is required");
    });
  });
  

  describe("toggleStar", () => {
    it("should toggle the star status of a user", async () => {
      const user = { username: "johndoe" };
      await userManager.addFavoriteUser(user);

      const result = await userManager.toggleStar("johndoe");
      expect(result[1].user.starred).toBe(true);

      const result2 = await userManager.toggleStar("johndoe");
      expect(result2[1].user.starred).toBe(false);
    });

    it("should set the star status to true if it is undefined", async () => {
      const user = { username: "johndoe" };
      await userManager.addFavoriteUser(user);

      const result = await userManager.toggleStar("johndoe");
      expect(result[1].user.starred).toBe(true);
    });

    it("should throw an error if user is not found", async () => {
      await expect(userManager.toggleStar("nonexistent")).rejects.toThrow("User not found");
    });

    it("should ensure only one user is starred at a time", async () => {
      const user1 = { username: "johndoe" };
      const user2 = { username: "janedoe" };
      await userManager.addFavoriteUser(user1);
      await userManager.addFavoriteUser(user2);

      await userManager.toggleStar("johndoe");
      const result = await userManager.toggleStar("janedoe");

      expect(result[1].user.starred).toBe(false);
      expect(result[2].user.starred).toBe(true);
    });
  });
});
