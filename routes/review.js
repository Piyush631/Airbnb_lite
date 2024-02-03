const express=require("express");
const router=express.Router({mergeParams:true}); //important concept to merge
const wrapAsync=require('../utils/WrapAsync.js')
const listing=require("../models/listing.js");
const ExpressError=require('../utils/ExpressError.js');

const{reviewSchema}=require('../schema.js');
const review=require("../models/review.js");

const{isLogIn,isOwner,isreviewauthor}=require('../middleware.js');
const reviewController=require('../controllers/review.js');

const validatereview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error){
       let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
        
    }
}
//add review
router.post("/",isLogIn,validatereview,wrapAsync(reviewController.addreview))
//delete review

router.delete("/:revid",isLogIn,wrapAsync(reviewController.deletereview));
module.exports=router;
