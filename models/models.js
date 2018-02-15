var Sequelize=require('sequelize');
var secret=require('../secret.json');

var DB_URL='postgres://'+secret.DB_User+':'+secret.DB_Password+'@'+secret.DB_Host+':5432/'+secret.Database;
var db=new Sequelize(DB_URL,{
    dialect:'postgres'
});

var Student=db.define('student',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    education:Sequelize.ARRAY(Sequelize.JSON),
    skills: Sequelize.ARRAY(Sequelize.JSON),
    compLanguages: Sequelize.ARRAY(Sequelize.JSON),
    projects: Sequelize.ARRAY(Sequelize.JSON),
});

const CompanyManager = db.define('companymanager', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    designation: Sequelize.STRING,
});

