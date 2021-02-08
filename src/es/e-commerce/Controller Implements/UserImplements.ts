import { UserLogin } from "../controllers/LoginController/UserLogin";
import { UserCrud } from "../controllers/userController/UserCrud";
import User = require("../models/user");

class UserControllers  {
    static async Create(req, res) {
        const Post = await new UserCrud()
        await Post.Create(User, req, res, "User Registered");
    }
    static async Login(req, res) {
        const Post = await new UserLogin()
        await Post.Login(User, req, res, "You are Logged");
    }
    static async Get(req, res) {
        const Post = await new UserCrud()
        await Post.Read(User, req, res, "User Founded");
    }
}

export = UserControllers;