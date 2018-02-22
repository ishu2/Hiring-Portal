var route=require('express').Router();
var models=require('./../models/models').models;
var uid=require('uid2');
var axios=require('axios');
var password=require('../utils/password');
var secrets=require('./../secret.json');

route.post('/',function(req,res){
  axios.post('https:')
})

