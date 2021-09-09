require('dotenv').config();
const sequelize = require('../sequelize/sequelize')
var screenshot = require('desktop-screenshot');

exports.saveTaskPackage = async (req, res, next) => {
    const { hours, minutes, seconds, memo } = req.body.timeStamp;
    const id = req.body.id
    const date = req.body.date
    screenshot("screenshot.png", function(error, complete) {
        if(error)
            console.log("Screenshot failed", error);
        else
            console.log("Screenshot succeeded");
    });
    try {
        await sequelize.query(`
            INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", picture, "createdAt", "updatedAt")
                VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '{}', '${date}', '${date}')
           `)


    } catch (error) {
        console.log(error.message)
    }
};


