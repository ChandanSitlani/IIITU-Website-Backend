//modules
var express=require('express'),
    passport=require('passport'),
    mongoose=require('mongoose'),
    LocalStrategy=require('passport-local'),
    bodyParser=require('body-parser'),
    passportLocalMongoose=require('passport-local-mongoose'),
    app=express();

var PORT=3000;


mongoose.connect('mongodb+srv://iiitu:iiitu@cluster0-vmrin.mongodb.net/test?retryWrites=true&w=majority');
var db=mongoose.connection;

db.on('error',function(){console.log('connection error')});
db.on('open',function(){
    console.log('connected to db:Server');
})




var User=require('./models/user'),
    Announcement=require('./models/announcement');


    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
app.get('/',function(req,res){
    res.send('hii');
})

app.post('/register',function(req,res){
    User.register( new User({name:req.body.name,email:req.body.email,username:req.body.username}),req.body.password,function(err,user){
        if(err){
            return res.status(300).send(err);}
        passport.authenticate("local")(req,res,function(){
            res.send({msg:"hiii",token:req.user._id});
        });
    
        });
    });


app.listen(PORT,function(err){
    if(err)
    console.log(err);
    else
    console.log('Listening on port',PORT)
})
