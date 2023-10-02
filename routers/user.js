const express = require("express")

const userRouter = express.Router()

// const session = require("express-session");


const appController = require("../controllers/userController");

const isAuth = require("../middleware/is-auth");






userRouter.get('/user',appController.landing_page)

userRouter.get("/login", appController.login_get);
userRouter.post("/login", appController.login_post);

userRouter.get("/register", appController.register_get);
userRouter.post("/register", appController.register_post);

userRouter.get("/dashboard", isAuth, appController.dashboard_get);

userRouter.post("/logout", appController.logout_post);


module.exports = userRouter;