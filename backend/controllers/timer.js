require('dotenv').config();
const sequelize = require('../sequelize/sequelize')


exports.saveTaskPackage = async (req, res, next) => {
    const { hours, minutes, seconds, memo } = req.body.timeStamp;
    const id = req.body.id
    const date = req.body.date
    try {
        await sequelize.query(`
        INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", "createdAt", "updatedAt")
            VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '${date}', '${date}')
       `)


    } catch (error) {
        console.log(error.message)
    }
};