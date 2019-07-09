var db = require('../dbconfig/dbconfig')

const Items = db.sequelize.define('Items', {
        // attributes

        id: {
            type: db.Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey:true

        },

        Name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
      

        Desc: {
            type: db.Sequelize.STRING,
            allowNull: false

        },
        Price: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
        ,

        imgItem: {
            type: db.Sequelize.STRING,
            allowNull: false
        }

    },

    {
        // options
        freezeTableName:true,
        tableName:'items'
    }

);

Items.sync({force:true})
    .then(function(result){
        console.log(result);
    })
    .catch(function(err){
        console.log(err)
    })

module.exports= {
    Items
}