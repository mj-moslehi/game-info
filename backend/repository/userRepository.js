const User = require("../model/user");

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
  }

  async findUserById(userId) {
    return await User.findOne({ _id: userId, deleted: false });
  }

  async findUserByUsername(username) {
    return await User.findOne({ username: username, deleted: false });
  }

  async updateUser(userId, updatedData) {
    return await User.findByIdAndUpdate(
      { _id: userId, deleted: false },
      updatedData,
      { new: true }
    );
  }

  async deleteUser(userId) {
    return await User.findByIdAndUpdate(
      { _id: userId },
      { deleted: true },
      { new: true }
    );
  }

  async getAllAdmins() {
    return await User.find({ role: "admin" }, { deleted: false }).select(
      "username firstName lastName deleted dateOfSignUp enable role"
    );
  }

  async getAllEmployees() {
    return await User.find({ role: "employee" }, { deleted: false }).select(
      "username firstName lastName deleted dateOfSignUp enable role"
    );
  }
}

module.exports = new UserRepository();
