const bcrypt = require("bcryptjs");

const Admin = require('../models/Admin')

exports.landing_page= (req,res)=>{
    res.render("admin/adminlanding")
  }

  exports.login_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("admin/adminlogin", { err: error });
  };

  exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (!admin) {
      req.session.error = "Invalid Credentials";
      console.log(req.session.error);
      return res.redirect("/admin/adminlogin");
    }
  
    const isMatch = await bcrypt.compare(password, admin.password);
  
    if (!isMatch) {
      req.session.error = "Invalid Credentials";
      console.log(req.session.error);
      return res.redirect("/admin/adminlogin");
  
    }
  
    req.session.isAuth = true;
    req.session.username = admin.username;
    res.redirect("/admin/adminHome");
  };


  //admin Redister
  exports.register_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("admin/adminRegister", { err: error });
  };



  exports.register_post = async (req, res) => {
    const { username, email, password } = req.body;
  
    let admin = await Admin.findOne({ email });
  
    if (admin) {
      req.session.error = "User already exists";
      return res.redirect("/admin/adminRegister");
    }
  
    const hasdPsw = await bcrypt.hash(password, 12);
  
    admin = new Admin({
      username,
      email,
      password: hasdPsw,
    });
  
    await admin.save();
    res.redirect("/admin/adminlogin");
  };


  exports.dashboard_get = (req, res) => {
    const username = req.session.username;
    res.render("admin/adminHome", { name: username });
  };

  exports.logout_post = (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/admin/adminlogin");
    });
  };
  