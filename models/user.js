var mongoose=require('mongoose'),
    passportLocalMongoose=require('passport-local-mongoose');

    var UserSchema=new mongoose.Schema({
        name:{type:String},
        username:{type:String},
        email:{type:String},
        role:{type:String},
        gender:{type:String}
    })

    UserSchema.plugin(passportLocalMongoose);
    module.exports=mongoose.model("User",UserSchema);