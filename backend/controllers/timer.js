require('dotenv').config();
const sequelize = require('../sequelize/sequelize')
const fs = require('fs');





exports.saveTaskPackage = async (req, res, next) => {
    const { hours, minutes, seconds, memo } = req.body.timeStamp;
    const id = req.body.id
    const date = req.body.date
    //**************************************************************** */




    //**************************************************************** */
    try {

        await sequelize.query(`
            INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", picture, "createdAt", "updatedAt")
                VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '{}', '${date}', '${date}')
           `)


    } catch (error) {
        console.log(error.message)
    }
};



exports.updateTime = async (req, res, next) => {
    console.log(req.body)
    const { hours, minutes, seconds, memo, date } = req.body;

    try {

        await sequelize.query(`
        UPDATE "Tasks" SET "hours" = ${hours}, "minutes" = ${minutes}, "seconds" = ${seconds}, "updatedAt" = '${date}'
        WHERE "memo" = '${memo}'
           `)


    } catch (error) {
        console.log(error.message)
    }
};

