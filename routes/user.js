const express=require("express");
const router=express.Router(); 
const user = require('../models/user.js');
const WrapAsync = require("../utils/WrapAsync");
const passport=require('passport');
const{redirecturl}=require('../middleware.js');
const userController=require('../controllers/user.js');
//singup
router.get("/signup",userController.rendersignup)

router.post("/signup",redirecturl,WrapAsync(userController.signup))
//login
router.get("/login",userController.renderlogin)

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
 userController.login);
 //logout
  router.get('/logout',userController.logout)
module.exports=router;