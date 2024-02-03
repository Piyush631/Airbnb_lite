const user=require("../models/user.js");
module.exports.rendersignup=(req,res)=>{

    res.render("user/signup.ejs");
}

module.exports.signup=async(req,res,next)=>{
    try{
     let {username,email,password}=req.body;
     const newuser=new user({email,username});
     let registereduser=await  user.register(newuser,password);
     console.log(registereduser);
     req.login(registereduser,(err)=>{
         if(err)
         {
             next(err);
         }
         req.flash("success","welcome to wanderlust");
         return res.redirect("/listing");
       
        
     })
   
    } catch(e)
    {
     req.flash("error",e.message);
     res.redirect("/signup");
    }
 
 };
 module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs");
};
module.exports.login= async(req, res)=> {
    req.flash("success","Welcome to wanderLust");
    res.redirect('/listing');
  };
  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","You are Logout");
        res.redirect("/listing");

    })
  };