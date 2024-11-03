const axios = require("../config/axiosConfig");
const conn = require("../db/conn");
let db = conn();

const userManager = {
  getUserGithub: async (username) => {
    if (!username || username === "") {
      throw new Error("Username is required");
    }
    
    const response = await axios.get(username);
    if (response.status === 403) {
      throw new Error("Failed to get user");
    }
    const user = response.data;

    const newUser = {
      id: user.id,
      name: user.name,
      username: user.login.toLowerCase(),
      avatar: user.avatar_url,
      url: user.html_url,
      starred: false,
    };

    return newUser;
  },

  addFavoriteUser: async (user) => {
    const lowercaseUsername = user.username.toLowerCase();
    const exists = Object.values(db).some(
      (u) => u.user.username === lowercaseUsername
    );

    if (exists) {
      throw new Error("User already exists");
    }

    if (Object.keys(db).length >= 5) {
      throw new Error("Maximum number of users reached");
    }

    const index = Object.keys(db).length + 1;

    db[index] = {
      user: {
        ...user,
        username: lowercaseUsername,
      },
    };
    return db;
  },

  getUserByUsername: async (username) => {
    const lowercaseUsername = username.toLowerCase();
    const user = Object.values(db).find(
      (u) => u.user.username === lowercaseUsername
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  getFavoriteUsers: async () => {
    return Object.values(db);
  },

  deleteFavoriteUser: async (username) => {
    if (!username || username === "") {
      throw new Error("Username is required");
    }

    const lowercaseUsername = username.toLowerCase();
    const userIndex = Object.values(db).findIndex(
      (u) => u.user.username === lowercaseUsername
    );
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    delete db[userIndex + 1];
    db = Object.values(db).reduce((acc, cur, index) => {
      return {
        ...acc,
        [index + 1]: cur,
      };
    }, {});
    return db;
  },

  toggleStar: async (username) => {
    const lowercaseUsername = username.toLowerCase();
    const userIndex = Object.keys(db).find(
      (key) => db[key].user.username === lowercaseUsername
    );

    if (!userIndex) {
      throw new Error("User not found");
    }

    if (!db[userIndex].user.starred) {
      Object.values(db).forEach((u) => {
        u.user.starred = false;
      });
      db[userIndex].user.starred = true;
    } else {
      db[userIndex].user.starred = false;
    }

    return db;
  },

  resetUsers: () => {
    db = {};
  },
};

module.exports = userManager;
