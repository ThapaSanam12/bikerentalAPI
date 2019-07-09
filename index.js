var express=require('express');
var multer=require('multer');
var app=new express();

var bodyparser = require('body-parser');

var controller = require('./controller/userController')

var itemController = require('./controller/ItemController')

var itemModel = require('./model/itemModel')

var authcontroller = require('./controller/AuthController')

//this is the first middleware - application middleware , all routes hit this middleware first
app.use(function(req,res,next){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization');
    next(); // next passes to another application middleware
})

app.use(bodyparser.json());


//

var publicDir = require('path').join(__filename,'/upload');
 app.use(express.static(publicDir));

 app.use(express.static('public'));

 //Serves all the request which includes /images in the url from Images folder
 app.use('/upload', express.static(__dirname + '/upload'));


 var mystorage =multer.diskStorage({
  destination:function (req,file,cb) {
   cb(null,'upload')
  },
  filename:(req,file,cb)=> {
   cb(null, 'img' + Date.now()+file.originalname )
  }
 })

 var upload = multer({storage:mystorage});


app.post('/v1/users/register',controller.hashGenerator,controller.registerUser,function (req,res) {
    res.status(201);
    res.send({"message":"user was registered"})
})

app.post('/v1/users/auths',authcontroller.verify,authcontroller.check,function (req,res) {
    res.status(202);
    res.send({"message":"user was logged in"})
})

app.post('/v1/addItems', upload.single('imgItem'),itemController.addItems,function (req,res) {
    res.status(203);
    res.send({"message":"Item added"})
})

app.get('v1/items',function (req,res) {
    itemModel.Items.findAll({
        attributes:['Name','Price']
    })
        .then(function (result) {
            console.log(result)
        })
        .catch(function (err) {
            console.log(err)
        })
})


app.use(function(err,req,res,next){


    res.status(err.status);
    res.send({"message":err.message})

})
app.listen(3000);