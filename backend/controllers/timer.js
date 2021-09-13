require('dotenv').config();
const sequelize = require('../sequelize/sequelize')
const fs = require('fs');
const childProcess = require('child_process')



exports.saveTaskPackage = async (req, res, next) => {
    const { hours, minutes, seconds, memo } = req.body.timeStamp;
    const id = req.body.id
    const date = req.body.date
    try {
        await sequelize.query(`
            INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", picture, "createdAt", "updatedAt")
                VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '{}', '${date}', '${date}')
           `)
        // const ids = await sequelize.query(`
        //     SELECT id FROM "Tasks"
        //         WHERE memo = '${memo}'
        // `)
        // res.json(ids)

    } catch (error) {
        console.log(error.message)
    }
};



exports.updateTime = async (req, res, next) => {
    console.log(req.body)
    const { hours, minutes, seconds, memo, date, usid, taskId } = req.body;


    try {
        await sequelize.query(`
        UPDATE "Tasks" SET "hours" = ${hours}, "minutes" = ${minutes}, "seconds" = ${seconds}, "updatedAt" = '${date}'
        WHERE "memo" = '${memo}' AND "userId" = '${usid}' AND id = '${taskId}'
           `);
        res.end()


    } catch (error) {
        console.log(error.message)
    }
};


// exports.getMemo = async (req, res, next) => {
//     let memo = req.body.data.memo;
//     let ids = req.body.data.id;
//     console.log(req.body)
//     try {
//        const task = await sequelize.query(`
//         SELECT * FROM "Tasks" WHERE "memo" = '${memo}' AND "userId" = '${ids}'
//        `)
//        res.json(task[0])
//     } catch (error) {
//         console.log(error.message)
//     }
// };