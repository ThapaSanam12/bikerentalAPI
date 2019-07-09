var db = require('../dbconfig/dbconfig')

const User = db.sequelize.define('User', {
        // attributes

        id: {
            type: db.Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey:true

        },

        firstname: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        username: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: db.Sequelize.STRING,
            allowNull: false

        }

    },

    {
        // options
        freezeTableName:true,
        tableName:'users'
    }

);

User.sync({force:false})
    .then(function(result){
        console.log(result);
    })
    .catch(function(err){
        console.log(err)
    })

module.exports= {
    User
}