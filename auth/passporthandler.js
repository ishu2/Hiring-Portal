var passport=require('passport');
var models=require('./../models/models').models;

var localStrategy=require('./strategies/local/localStrategy');

var config=require('./../config');

passport.serializeUser(function(user,abc){
  if(!user){
      return abc(null,false);
  }
  return abc(null,user.id);
});

passport.deserializeUser(function(userId,abc){
    if(!userId){
        return abc(null,userId);
    }
    models.User.findByPrimary(userId).then(function(user){
        return abc(null,user);
    }).catch(function(err){
        console.log(err);
        abc(err,false);
    })
});

passport.use(localStrategy);

module.exports=passport;