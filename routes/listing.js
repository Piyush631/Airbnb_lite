const express=require("express");
const router=express.Router();
const listing=require("../models/listing.js");
const wrapAsync=require('../utils/WrapAsync.js')

const{isLogIn,isOwner,validatelisting,isFound}=require('../middleware.js');
const listingController=require('../controllers/listing.js');
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });




//index
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLogIn,upload.single('listing[image]'),validatelisting,wrapAsync(listingController.addlisting) 

 
);
router.get("/category/:cat",wrapAsync(listingController.category));

  //show
  router.get("/show/:id",wrapAsync(listingController.showlisting))
  //add lsiting
  router.get("/add",isLogIn,(req,res)=>{
   
      res.render("add.ejs");
  });
//search
router.get("/find",isFound,wrapAsync(listingController.searchlisting));
 

//edit and delete
router.get("/:id/edit",isLogIn,wrapAsync(listingController.rendereditlisting));
router.route("/:id")
.put(isLogIn,upload.single('listing[image]'),isOwner,validatelisting,wrapAsync(listingController.updatelisting))
.delete(isLogIn,isOwner,wrapAsync(listingController.destroylisting));



module.exports=router;