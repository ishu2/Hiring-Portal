var LocalStrategy=require('passport-local').Strategy;
var models=require('./../../../models/models');

module.exports=new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},function(email,password,done){
    models.User.findOne({
        where:{email:email},
        include:models.UserLocal
    }).then(function(user){
        if(!user){
            return done(null,false,{message:"Incorrect Email.."});
        } else{
            passutils.compare2hash(password,user.userlocal.password).then(function(match){
                if(match){
                    delete user.userlocal;
                    return done(null,user);
                } else{
                    return done(null,false,{message:"Incorrect password.."});
                }
            }).catch(function(err){
                console.log(err);
                return done(err,false,{message:'Invalid user..'});
            });
        }
    }).catch(function(err){
        console.log(err);
        done(err);
    });
});