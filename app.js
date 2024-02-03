if(process.env.NODE_ENV != "production")
{
    require('dotenv').config()
}





const express=require("express");
const app=express();
const mongoose = require('mongoose');
const listing=require("./models/listing.js");
const path=require("path");
app.set("view engine","ejs");
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));

const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

const ExpressError=require('./utils/ExpressError.js');


const listingsRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport=require('passport');
const localStrategy=require("passport-local")
const user = require('./models/user.js');
const dburl=process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
 


}

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})
store.on("error",()=>{
    console.log("error in mongoose",error);
});
const sessionOption={
     store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
};


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//creating locals
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


app.get("/",(req,res)=>{
    res.render("show.ejs");
})
app.use("/listing",listingsRouter);

app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter)



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

app.use((err,req,res,next)=>{
    let {statuscode=500,message="some theing went wrong"}=err;
    res.render("error.ejs",{statuscode,message});
})
app.listen(4020,()=>{ 
    console.log("mongosee is connected to port 4020");
});