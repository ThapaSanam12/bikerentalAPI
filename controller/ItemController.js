var itemModel = require('../model/itemModel')

function addItems(req,res,next) {

    itemModel.Items.create({

        Name: req.body.Name,
        Desc: req.body.Desc,
        Price: req.body.Price,
      
        imgItem: req.body.filename

    })
        .then(function (result) {
            console.log("hey");
            next()

        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })

}



module.exports = {
    addItems
}
