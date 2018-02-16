var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
var passport=require('cookie-parser');
var cors=require('cors');
var db=require('./models/models');
var passport=require('./auth/passporthandler');

var app=express();
var secrets=require('./secrets.json');

var apirouter=require('./routes/api');
var loginrouter=require('./routes/login');
var logoutrouter=require('./routes/logout');
var signuprouter=require('./routes/signup');
var authorizerouter=require('./routes/authorize');
var profilerouter=require('./routes/profile');
var unauthorizerouter=require('./routes/unauthorize');
var ensure=require('./auth/authutils');
 
app.set('view engine','ejs');

app.use('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:secrets.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',function(req,res){
    res.status(200).send({
        running:true
    })
});

app.use('/signup',signuprouter);
app.use('/login',loginrouter);
app.use('/profile',profilerouter);
app.use('/logout',logoutrouter);
app.use('/authorize',authorizerouter);
app.use('/unauthorize',unauthorizerouter);
app.use('/api',apirouter);

app.listen(2000,function(){
    console.log("Server started at port 2000...");
});

module.exports=app;
