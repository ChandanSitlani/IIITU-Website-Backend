var mongoose=require('mongoose');

var AnnouncementSchema=new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    madeOn:{type:Date}
})

module.exports=mongoose.model("Announcement",AnnouncementSchema);