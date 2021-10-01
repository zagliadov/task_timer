require('dotenv').config();
const sequelize = require('../sequelize/sequelize')

exports.saveTaskPackage = async (req, res, next) => {
    const { hours, minutes, seconds, memo } = req.body.timeStamp;
    const id = req.body.id;
    const date = req.body.date;
    try {
        await sequelize.query(`
            INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", picture, "createdAt")
                VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '{}', '${date}')
           `)
        res.status(201).json({message: 'resolved'});


    } catch (error) {
        console.log(error.message)
    }
};



exports.updateTime = async (req, res, next) => {

    const { hours, minutes, seconds, memo, usid, taskId, date } = req.body;

    try {
        await sequelize.query(`
        UPDATE "Tasks" SET "hours" = ${hours}, "minutes" = ${minutes}, "seconds" = ${seconds}
        WHERE "memo" = '${memo}' AND "userId" = '${usid}' AND id = '${taskId}' AND "createdAt" = '${date}'
           `);

        res.status(200).json({message: 'resolved'})


    } catch (error) {
        console.log(error.message)
    }
};

