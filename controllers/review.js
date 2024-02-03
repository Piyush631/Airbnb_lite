const listing=require("../models/listing.js");
const review=require("../models/review.js");

module.exports.addreview=async(req,res)=>{
    let listings=await listing.findById(req.params.id);
    let newreview=new review(req.body.review);
    newreview.author=req.user._id;
    listings.review.push(newreview);
    await newreview.save();
    await listings.save();

   res.redirect(`/listing/show/${listings._id}`);
    
    };

module.exports.deletereview=async(req,res)=>{
    let{id,revid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:revid}});
    await review.findByIdAndDelete(revid);
    res.redirect(`/listing/show/${id}`);
}