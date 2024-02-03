const listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require('./utils/ExpressError.js');
const{listingSchema}=require('./schema.js');
module.exports.isLogIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","you must login first");
        return res.redirect("/login");
      }
      next();
}
module.exports.redirecturl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>
{
    let {id}=req.params;
   
    let listings=await listing.findById(id);
   if( !listings.owner === res.locals.currUser._id)
{
  req.flash("error","You dont have premission to edit");
  return res.redirect(`/listing/${id}`);
}
next();
}

module.exports.validatelisting=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
       let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}
module.exports.isreviewauthor=async(req,res,next)=>{
  let{id,revid}=req.params;
  let review=await Review.findById(revid);
  if(review.author.equals(res.locals._id))
  {
   next();
  }
  req.flash("error","you dont have premission to delete");
  return res.redirect(`/listing/${id}`);
}
module.exports.isFound=async (req,res,next)=>
{
    
   
    let {search}=req.query;
  const  alllisting= await listing.find({"location":search});
 
  if(alllisting)
{

next();
}else{
  req.flash("error","Listing not found");
  return res.redirect(`/listing`);

}

}