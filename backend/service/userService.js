const UserRepository = require("../repository/userRepository.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

class UserService {
  async createUser(userData) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      await UserRepository.createUser(userData);
    } catch (error) {
      throw new Error(`failed to create user : ${error.message}`);
    }
  }

  async findUserById(userId) {
    try {
      const user = await UserRepository.findUserById(userId);
      if (!user) throw new Error(`user with id: ${userId} wasn't found`);
      return user;
    } catch (error) {
      throw new Error(`failed to find user by id : ${error.message}`);
    }
  }

  async findUserByUsername(username) {
    try {
      const user = await UserRepository.findUserByUsername(username);
      if (!user)
        throw new Error(`the user with username: ${username} wasn't found`);
      return user;
    } catch (error) {
      throw new Error(
        `failed to find user by username: ${username} -> ${error.message}`
      );
    }
  }

  async updateUser(updateReq, id) {
    try {
      this.updateValidation(updateReq);
      const update = {
        firstName: updateReq.firstName,
        lastName: updateReq.lastName,
        password: updateReq.password,
        username: updateReq.username,
      };
      if (update.password != undefined || update.password != null)
        update.password = await bcrypt.hash(update.password, 10);
      return await UserRepository.updateUser(id, update);
    } catch (error) {
      throw new Error(`failed to update the user : ${error.message}`);
    }
  }

  updateValidation(updateDate) {
    const nameRegex = /^[A-Za-z ]{2,}$/;
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!nameRegex.test(updateDate.firstName))
      throw new Error("first name isn't valid");
    if (!nameRegex.test(updateDate.lastName))
      throw new Error("last name isn't valid");
    if (!usernameRegex.test(updateDate.username))
      throw new Error("username isn't valid");
    if (updateDate.password != null || updateDate.password != undefined) {
      if (!passwordRegex.test(updateDate.password))
        throw new Error("password isn't valid");
    }
  }

  async deleteUser(userId) {
    try {
      if (!(await this.findUserById(userId))) {
        throw new Error("User not found");
      }
      await UserRepository.deleteUser(userId);
    } catch (error) {
      throw new Error(`failed to delete the user : ${error.message}`);
    }
  }

  async signIn(username, password) {
    try {
      const user = await this.findUserByUsername(username);
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("the password isn't correct");
      }

      const data = {
        _id: user._id,
        username: user.username,
        role: user.role,
        enable: user.enable,
      };
      const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

      return {
        message: "Successfully logged in",
        id: user._id,
        token: token,
        role: user.role,
        enable: user.enable,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllAdmins() {
    return await UserRepository.getAllAdmins();
  }

  async getAllEmployees() {
    return await UserRepository.getAllEmployees();
  }

  async givingAccessEmployee(userId, enable) {
    try {
      const updatedUser = await this.findUserById(userId);
      updatedUser.enable = enable;
      const user = await UserRepository.updateUser(userId, updatedUser);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to update user status: ${error.message}`);
    }
  }
}

module.exports = new UserService();
