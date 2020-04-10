//modules
var express=require('express'),
    passport=require('passport'),
    mongoose=require('mongoose'),
    LocalStrategy=require('passport-local'),
    bodyParser=require('body-parser'),
    multer=require('multer'),
    passportLocalMongoose=require('passport-local-mongoose'),
    app=express();

var PORT=3000;


var storage=multer.diskStorage({
    
    destination:'static/uploads/',
    filename:function(req,file,cb){
    cb(null,file.originalname);
}
})
var upload=multer({storage:storage});
mongoose.connect('mongodb+srv://iiitu:iiitu@cluster0-vmrin.mongodb.net/test?retryWrites=true&w=majority');
var db=mongoose.connection;

db.on('error',function(){console.log('connection error')});
db.on('open',function(){
    console.log('connected to db:Server');
})

app.use(express.static('static'));


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
    User.register( new User({
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        username:req.body.username
    }),req.body.password,function(err,user){
        if(err){
            return res.status(300).send(err);}
        passport.authenticate("local")(req,res,function(){
            res.send({msg:"hiii",token:req.user._id});
        });
    
        });
    });


    app.post('/login',function(req,res){
        passport.authenticate("local",{failureRedirect:'/'})(req,res,function(){
            res.send({_id:req.user._id,role:req.user.role})
        })
    })

    app.get('/getusers',function(req,res){
        User.find({},function(err,users){
            res.send(users);
        })
    })



    app.post('/makeannouncement',upload.single('file'),function(req,res){
        
        Announcement.create(new Announcement({title:req.body.title,content:req.body.content,documentUrl:'uploads/'+req.file.filename}),function(err,announcement){
            console.log(req.body);
            console.log(req.file);
            if(err){
                res.status(300).send({err:err})
            }
            else
            res.send(announcement);
        })
    });

    app.get('/announcements',function(req,res){
        Announcement.find({},function(err,announcements){
            res.send(announcements);
        })
    });

    app.post('/deleteannouncement',function(req,res){   
        Announcement.findOneAndRemove({_id:req.body._id},function(err,announcement){
            //console.log(req.body)
            //console.log(announcement)
            if(err)
            res.status(300).send(err);
            else
            res.send({mas:'ok'});
        })
    })


app.listen(PORT,function(err){
    if(err)
    console.log(err);
    else
    console.log('Listening on port',PORT)
})
