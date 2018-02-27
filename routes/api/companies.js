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

router.get('/',function(req,res){
    models.Company.findAll({
        attributes:['id','name','logo','locations']
    }).then(function(companies){
        res.status(200).send(companies);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("Could not get companies..");
    });
});

router.get('/:id',function(req,res){
    var companyId=parseInt(req.params.id);
    models.Company.findOne({
        where:{id:companyId}
    }).then(function(company){
        if(company)
          res.status(200).send(company.get());
        else
          res.status(500).send("Could not find any company with this is..");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("Unknown company..");
    });
});

router.put('/:id',passport.authenticate('bearer'),function(req,res){
    var companyId=parseInt(req.params.id),
        logo=req.body.logo,
        website=req.body.website,
        locations=req.body.locations,
        skills=req.body.skills,
        companyEmail=req.body.companyEmail,
        companyNumber=req.body.companyNumber;

        if(req.user){
            models.Admin.findOne({
                where:{userId:req.user.id}
            }).then(function(admin){
                if(admin){
                    models.Company.update({
                        website:website,
                        logo:logo,
                        locations:locations,
                        skills:skills,
                        companyEmail:companyEmail,
                        companyNumber:companyNumber
                    },{
                        where:{id:companyId}
                    }).then(function(rows){
                        res.status(200).send("Updated..");
                    }).catch(function(err){
                        console.log(err);
                        res.status(500).send("Error");
                    });
                }
                else{
                    
                }
            })
        }
})