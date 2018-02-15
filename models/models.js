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

var CompanyManager = db.define('companymanager', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    designation: Sequelize.STRING,
});

var Admin=db.define('admin',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    designation:Sequelize.STRING
});

var User=db.define('user',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    name:Sequelize.STRING,
    contact:Sequelize.STRING,
    email:Sequelize.STRING,
    image:Sequelize.STRING
});

Student.belongsTo(User);
User.hasOne(Student);
CompanyManager.belongsTo(User);
User.hasOne(CompanyManager);
Admin.belongsTo(User);
User.hasOne(Admin);

var OneAuth=db.define('authtoken',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    oneauthId:Sequelize.INTEGER,
    oneauthToken:Sequelize.STRING,
    token:Sequelize.STRING
});

OneAuth.belongsTo(User);
User.hasMany(OneAuth);

var Company=db.define('company',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    name:Sequelize.STRING,
    website:Sequelize.STRING,
    locations:Sequelize.ARRAY(Sequelize.STRING),
    skills:Sequelize.ARRAY(Sequelize.STRING),
    contactEmail:Sequelize.STRING,
    contactNumber:Sequelize.STRING
});

var Job=db.define('job',{
    id:{type:Sequelize.INTEGER, autoIncrement:true, primaryKey:true},
    title:Sequelize.String,
    description:Sequelize.STRING,
    skills:Sequelize.ARRAY(Sequelize.STRING),
    jobType:Sequelize.STRING,
    location:Sequelize.STRING,
    salary:Sequelize.STRING,
    active:Sequelize.BOOLEAN,
    startDate:Sequelize.STRING,
    endDate:Sequelize.STRING
});

var Application=db.define('application'{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    status:Sequelize.STRING,
    date:Sequelize.INTEGER,
    application:Sequelize.STRING
});

CompanyManager.belongsTo(Company);
Company.hasMany(CompanyManager);

Job.belongsTo(Company);
Company.hasMany(CompanyManager);

Job.belongsTo(Company);
Company.hasMany(Job);

Application.belongsTo(User);
User.hasMany(Application);

Application.belongsTo(Job);
Job.hasMany(Application);

module.exports={
    models:{
        Student,
        CompanyManager,
        Admin,
        User,
        Company,
        Job,
        Application,
        OneAuth
    },
    db:db
};
