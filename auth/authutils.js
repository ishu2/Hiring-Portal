var models=require('./../models/models').models;
var config=require('./../config');

function ensureLogin(){
    return function(req,res,next){
        if(config.DEV_MODE || req.user){
            next();
        }else{
            res.status(401).send("Please login first..");
        }
    }
}

function ensureCompanyManager(){
    return function(req,res,next){
        if(req.user){
            models.CompanyManager.findOne({
                where:{userId:req.user.id}
            }).then(function(user){
                if(user)
                  next();
                else 
                  res.status(401).send("Only company managers are allowed..");
            })
        } else{
            res.status(401).send("Please login first..");
        }
    }
}

function ensureAdmin(){
    return function(req,res,next){
        if(req.user){
            models.Admin.findOne({
                where:{userId:req.user.id}
            }).then(function(user){
                if(user)
                  next();
                else
                  res.status(401).send("Only admins are allowed..");
            })
        } else{
            res.status(401).send("Please login first..");
        }
    }
}


function ensureStudent(){
    return function(req,res,next){
        if(req.user){
            models.Student.findOne({
                where:{userId:req.user.id}
            }).then(function(user){
                if(user)
                  next();
                else
                  res.status(401).send("Only students are allowed..");
            })
        } else{
            res.status(401).send("Please login first..");
        }
    }
}

module.exports={
    ensureLogin,
    ensureAdmin,
    ensureCompanyManager,
    ensureStudent
};