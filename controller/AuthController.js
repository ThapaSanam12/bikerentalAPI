var userModel = require('../model/userModel');


var bcrypt = require('bcrypt');


function verify(req,res,next){
    userModel.User.findOne({
        where:{username:req.body.username}
    })
    //user have been rergistered
        .then(function(result){
            if(result != null){
                next();
            }else{
                next({"status":405,"message":"Credential didn't match"});
            }
        })
        .catch(function(err){
            next({"status":405 ,"message":err});
        })
}

function check(req,res,next){
    userModel.User.findOne({
        where: {username:req.body.username}
    })

        .then(function(result){
            if(result != null){
                bcrypt.compare(req.body.password, result.dataValues.password, function(err, res) {
                    if(res) {
                        next({"status":200,"message":"Valid User Login."});
                    } else {
                        next({"status":405,"message":"Credential didn't match."});
                    }
                });
            }else{
                next({"status":405,"message":"Credential didn't match."});
            }
        })
        .catch(function(err){
            next({"status":500, "message":"Error Occured"});
        })
}

module.exports ={
    verify,
    check
}