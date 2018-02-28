var route=require('express').Router();
var models=require('./../models/models').models;
var uid=require('uid2');
var axios=require('axios');
var password=require('../utils/password');
var secrets=require('./../secret.json');

route.post('/',function(req,res){
  axios.post('https://account.abc.com/oauth/token',{
    "client_id":secrets.CLIENT_ID,
    "redirect_url":secrets.REDIRECT_URI,
    "client_secret":secrets.CLIENT_SECRET,
    "grant_type":secrets.GRANT_TYPE,
    "code":req.body.code
  }).then(function(authtoken){
    models.OneAuth.findOne({
      where:{
        oneauthToken:authtoken.data.access_token
      }, include:[models.User]
    }).then(function(oneauth){
      if(oneauth!==null){
        res.status(200).send({
          success:true,
          token:oneauth.token,
          user:oneauth.user.name
        })
      }
      else{
        axios.get('https://account.abc.com/api/users/me',{
          headers:{ 'Authorization':`Bearer ${authtoken.data.access_token}`}
        }).then(function(user){
          models.OneAuth.create({
            user:{
              name:user.data.firstname+" "+user.data.lastname,
              email:user.data.email
            }
            , oneauthToken:authtoken.data.access_token
            , token:uid(30)
          },{
            include:[models.User]
          }).then(function(oneauthFinal){
            res.status(201).send({
              success:true,
              token:oneauthFinal.token,
              user:user.data.firstname+" "+user.data.lastname
            })
          }).catch(function(err){
            console.log(err);
            res.status(500).send({
              success:false,
              code:"500",
              error:{
                message:"could not create in Oneauth table(Internal server error"
              }
            })
          })
        }).catch(function(err){
          console.log(err);
          res.status(500).send({
            success:false,
            code:"500",
            error:{
              message:"could not get details from Oneauth API(Internal Server Error"
            }
          })
        })
      }
    }).catch(function(err){
      console.log(err);
      res.status(500).send({
        success:false,
        code:"500",
        error:{
          message:"Could not find in Oneauth(Internal Server error)"
        }
      })
    })
  }).catch(function(err){
    console.log(err);
    res.status(500).send({
      success:false,
      code:"500",
      error:{
        message:"Could not find in Oneauth(Internal Server error)"
      }
    })
  })
})

module.exports=route;

