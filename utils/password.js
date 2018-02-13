var bcrypt=require('bcrypt');
var saltRounds=10;

var pass2hash=function(pass){
    return bcrypt.hash(pass,saltRounds);
}

var compare2hash=function(pass,hash){
    return bcrypt.compare(pass,hash);
}

module.exports={
    pass2hash , compare2hash
}