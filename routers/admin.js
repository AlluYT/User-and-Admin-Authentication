const express = require("express");
const adminRouter = express.Router()
const session = require("express-session");



const adminAppController = require('../controllers/adminController')

const adminAuth = require("../middleware/admin-isAuth")



adminRouter.get('/admin',adminAppController.landing_page)

adminRouter.get("/admin/adminlogin",adminAppController.login_get)
adminRouter.post('/admin/adminlogin',adminAppController.login_post)

adminRouter.get("/admin/adminRegister",adminAppController.register_get)
adminRouter.post("/admin/adminRegister",adminAppController.register_post)

adminRouter.get("/admin/adminHome", adminAuth,adminAppController.dashboard_get)

adminRouter.post("/adminlogout", adminAppController.logout_post);

module.exports= adminRouter;