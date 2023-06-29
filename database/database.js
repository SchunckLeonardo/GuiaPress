const Sequelize = require('sequelize')
const connection = new Sequelize('blogpress', 'root', 'Leo123nar456!', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
})

module.exports = connection