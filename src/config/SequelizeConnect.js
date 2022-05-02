const {Sequelize} = require("sequelize")
const appSettings = require("../config/appSettings.json")

const {dialect}=appSettings.project.sequelize

const sequalizeConnect = ()=>{
    const sequelize = new Sequalize({
        dialect
    })
    return sequelize
}

module.exports=sequelizeConnect