const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");

const appController = require("./controllers/userController");
const adminAppController = require('./controllers/adminController')
const isAuth = require("./middleware/is-auth");
const adminAuth = require("./middleware/admin-isAuth")
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')

const app = express();
connectDB();

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


//=================== Routes
// Landing Page
app.get("/", appController.home_page);

app.use("/", userRouter)

app.use('/',adminRouter)
// app.get('/user',appController.landing_page)
// app.get('/admin',adminAppController.landing_page)

// Login Page
// app.get("/login", appController.login_get);
// app.post("/login", appController.login_post);
// app.get("/admin/adminlogin",adminAppController.login_get)
// app.post('/admin/adminlogin',adminAppController.login_post)

// Register Page
// app.get("/register", appController.register_get);
// app.post("/register", appController.register_post);
// app.get("/admin/adminRegister",adminAppController.register_get)
// app.post("/admin/adminRegister",adminAppController.register_post)

// Dashboard Page
// app.get("/dashboard", isAuth, appController.dashboard_get);
// app.get("/admin/adminHome", adminAuth,adminAppController.dashboard_get)


// app.post("/logout", appController.logout_post);
// app.post("/adminlogout", adminAppController.logout_post);

app.listen(5000, console.log("App Running on http://localhost:5000"));
