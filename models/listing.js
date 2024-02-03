const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const review=require("./review.js");
const listingSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        
        },
        description:{
            type:String,
            required:true
        
         
        },
        image:{
            url:String,
            filename:String,
        },
        price:{
            type:Number,
            required:true
       

        },
        location:{
         type:String,
      
        },
            
        country:String,
        category:{
            type:String,
            enum:["mountains","beaches","rooms","snowignu","trending","campign","boathouse"]
        },
        review:[
            {
                type:Schema.Types.ObjectId,
                ref:"review",
            }
        ],
        owner:[
            {
                type:Schema.Types.ObjectId,
                ref:"user",
            }
        ],
       
 });
 listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id : {$in: listing.review}  })
    }

   
 })

 const listing=mongoose.model("listing",listingSchema);
 module.exports=listing;