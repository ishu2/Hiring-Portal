var router=require('express').Router();
var models=require('./../../models/models').models;
var password=require('./../../utils/password');
var ensure=require('./../../auth/authutils');
var passport=require('./../../auth/passporthandler');

router.post('/add',passport.authenticate('bearer'),ensure.ensureAdmin,function(req,res){
    if(!req.body.userId===true){
        res.status(400).send("Only valid users can be made admins..");
    }

    models.Admin.create({
        centre:req.body.centre,
        designation:req.body.designation,
        userId:req.body.userId
    }).then(function(admin){
        if(admin)
          res.status(201).send("Admin created..");
        else
          res.status(500).send("Could not create the Admin..");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("Could not create the Admin..");
    });
});

router.git('/:id',passport.authenticate('bearer'),ensure.ensureAdmin,function(req,res){
    models.User.findOne({
        where:{id:req.params.id},
        include:models.Admin
    }).then(function(user){
        res.status(200).send(user);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("Unknown admin..");
    });
});

