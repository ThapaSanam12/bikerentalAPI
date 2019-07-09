var userModel = require('../model/userModel');

var bcrypt = require('bcrypt');
var saltRounds = 10;


function hashGenerator(req,res,next) {

    bcrypt.hash(req.body.password,saltRounds)
        .then(function (hash) {
            console.log(hash);
            req.hashvalue = hash;
            next();

        })
        .catch(function (err) {
            console.log(err)
        })
}


function registerUser(req,res,next) {
   
    userModel.User.create({

        firstname: req.body.firstname,
        lastname :req.body. lastname ,
        username:req.body.username,
        password :req.hashvalue

    })
        .then(function (result) {
            console.log('abc')
           next()

        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })
}



module.exports = {
    registerUser,
    hashGenerator
}