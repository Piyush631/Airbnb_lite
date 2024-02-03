const listing=require("../models/listing.js");
module.exports.index=async(req,res)=>{
    const  alllisting= await listing.find({});
    res.render("show.ejs",{alllisting});
  
  
  };
  module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const details=await listing.findById(id).populate({
      path:"review",
      
      populate:{
        path:"author",
      },
    }).populate("owner");
    
    
    
    
    if(!details)
    {
      req.flash("error","Listing not found");
      res.redirect("/listing");
    }
    res.render("detail.ejs",{details});

};

module.exports.addlisting=async (req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  
    const newlisting= new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
       await newlisting.save();
       req.flash("success","New Listing is Created");
       res.redirect("/listing");
   };
   //render
   module.exports.rendereditlisting=async(req,res)=>{
    let {id}=req.params;
 const edit=await listing.findById(id);
 if(!edit)
   {
     req.flash("error","Listing not found");
     res.redirect("/listing");
   }
 let originalurl=edit.image.url;

 originalurl = originalurl.replace("/upload","/upload/h_200,w_200");
    res.render("edit.ejs",{edit,originalurl});
 };  

 //catgeory
 module.exports.category=async(req,res)=>{
  let{cat}=req.params;

  const  alllisting= await listing.find({"category":cat});

    res.render("show.ejs",{alllisting});
 
 

};
 //update
 module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    let updatelisting=await listing.findByIdAndUpdate(id,{ ...req.body.listing});
    if(typeof req.file !=="undefined")
    {
      let url=req.file.path;
      let filename=req.file.filename;
          
       
         updatelisting.image={url,filename};
         await updatelisting.save();
    }
 
   
   
   req.flash("success","Listing is Updated");
   res.redirect("/listing");
 };
 module.exports.destroylisting=async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted");
    res.redirect("/listing");
    
 };

 //search
 module.exports.searchlisting=async(req,res)=>{
  let {search}=req.query;
  const  alllisting= await listing.find({"location":search});
  res.render("show.ejs",{alllisting});
  
}