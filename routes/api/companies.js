var router = require('express').Router();
var models = require('./../../models/models').models;
var password = require('./../../utils/password');
var ensure = require('./../../auth/authutils');
var passport = require('./../../auth/passporthandler');
var config = require('./../../config');

router.post('/add',passport.authenticate('bearer'),ensure.ensureAdmin(),function(req,res){
  if(req.body.name===""){
      res.status(403).send("Insufficient Details..");
  }    
  models.Company.create({
      name:re.body.name,
      website:req.body.website,
      locations:req.body.locations,
      skills:req.body.skills,
      contactEmail:req.body.contactEmail,
      contactNumber:req.body.contactNumber
  }).then(function(company){
      res.status(201).send(company.get());
  }).catch(function(err){
      console.log(err);
      res.status(500).send("Could not create company..");
  });
});