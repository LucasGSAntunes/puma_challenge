const userServices = require("../../../services/userService");
const userManager = require("../../../managers/userManager");

jest.mock("../../../managers/userManager");

describe("userServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addFavoriteUser", () => {
    it("should add a favorite user and return the user", async () => {
      const mockUser = { username: "testuser" };
      userManager.getUserGithub.mockResolvedValue(mockUser);
      userManager.addFavoriteUser.mockResolvedValue();

      const result = await userServices.addFavoriteUser("testuser");

      expect(userManager.getUserGithub).toHaveBeenCalledWith("testuser");
      expect(userManager.addFavoriteUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if userManager.getUserGithub fails", async () => {
      const error = new Error("Failed to get user");
      userManager.getUserGithub.mockRejectedValue(error);

      await expect(userServices.addFavoriteUser("testuser")).rejects.toThrow(
        error
      );
    });
  });

  describe("getFavoriteUsers", () => {
    it("should return favorite users", async () => {
      const mockUsers = [{ username: "testuser1" }, { username: "testuser2" }];
      userManager.getFavoriteUsers.mockResolvedValue(mockUsers);

      const result = await userServices.getFavoriteUsers();

      expect(userManager.getFavoriteUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it("should throw an error if userManager.getFavoriteUsers fails", async () => {
      const error = new Error("Failed to get favorite users");
      userManager.getFavoriteUsers.mockRejectedValue(error);

      await expect(userServices.getFavoriteUsers()).rejects.toThrow(error);
    });
  });

  describe("deleteFavoriteUser", () => {
    it("should delete a favorite user and return the result", async () => {
      const mockResult = { success: true };
      userManager.deleteFavoriteUser.mockResolvedValue(mockResult);

      const result = await userServices.deleteFavoriteUser("testuser");

      expect(userManager.deleteFavoriteUser).toHaveBeenCalledWith("testuser");
      expect(result).toEqual(mockResult);
    });

    it("should throw an error if userManager.deleteFavoriteUser fails", async () => {
      const error = new Error("Failed to delete favorite user");
      userManager.deleteFavoriteUser.mockRejectedValue(error);

      await expect(userServices.deleteFavoriteUser("testuser")).rejects.toThrow(
        error
      );
    });
  });

  describe("toggleStar", () => {
    it("should toggle star for a user and return the result", async () => {
      const mockResult = { starred: true };
      userManager.toggleStar.mockResolvedValue(mockResult);

      const result = await userServices.toggleStar("testuser");

      expect(userManager.toggleStar).toHaveBeenCalledWith("testuser");
      expect(result).toEqual(mockResult);
    });

    it("should throw an error if userManager.toggleStar fails", async () => {
      const error = new Error("Failed to toggle star");
      userManager.toggleStar.mockRejectedValue(error);

      await expect(userServices.toggleStar("testuser")).rejects.toThrow(error);
    });
  });
});
