const UserService = require("../service/userService");

class UserController {
    async createUser(req, res) {
        try {
            await UserService.createUser(req.body);
            res.status(201).json("User created successfully");
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async findUserById(req, res) {
        try {
            const userId = req.body.id;
            const user = await UserService.findUserById(userId);
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async findUserByUsername(req, res) {
        try {
            const username = req.body.username;
            const user = await UserService.findUserByUsername(username);
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.updateUser(
                req.body.updateReq,
                req.body.id
            );
            if (!updatedUser) {
                return res
                    .status(404)
                    .json({error: "User not found or already deleted"});
            }
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await UserService.deleteUser(req.body.id);
            if (!deletedUser) {
                return res.status(200).json({message: "User deleted successfully"});
            } else return res.status(400).json({message: "Deleting user failed"});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllAdmins(req, res) {
        try {
            const admins = await UserService.getAllAdmins();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await UserService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async givingAccessEmployee(req, res) {
        try {
            const userId = req.body.id;
            const enable = req.body.enable;
            const updatedUser = await UserService.givingAccessEmployee(
                userId,
                enable
            );
            res.status(200).json({
                message: `User has been ${
                    enable ? "enabled" : "disabled"
                } successfully`,
                user: updatedUser,
            });
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async signIn(req, res) {
        try {
            const user = await UserService.signIn(
                req.body.username,
                req.body.password
            );
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = new UserController();
