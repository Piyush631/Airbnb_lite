const mongoose=require('mongoose');
const initdata=require("./data.js");
const listing=require("../models/listing.js")
main().then((res)=>{
    console.log("connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}
const initDb=async()=>{
await listing.deleteMany({});
initdata.data=initdata.data.map((obj)=>({...obj,owner:"65b0b1b339437636a9a12b21"}));
await listing.insertMany(initdata.data);
console.log("successfull initilized");
};
initDb();