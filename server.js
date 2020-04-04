//modules
var express=require('express'),
    passport=require('passport'),
    mongoose=require('mongoose'),
    LocalStrategy=require('passport-local'),
    bodyParser=require('body-parser'),
    passportLocalMongoose=require('passport-local-mongoose'),
    app=express();

var PORT=3000;




app.get('/',function(req,res){
    res.send('hii');
})

app.listen(PORT,function(err){
    if(err)
    console.log(err);
    else
    console.log('Listening on port',PORT)
})