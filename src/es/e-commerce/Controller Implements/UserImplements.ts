import { UserCrud } from "../controllers/userController/UserCrud";
import User = require("../models/user");

class UserControllers  {
    static async Create(req, res) {
        const Post = await new UserCrud()
        await Post.Create(User, req, res, "User Registered");
    }
}

export = UserControllers;