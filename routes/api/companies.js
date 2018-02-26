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
  
})