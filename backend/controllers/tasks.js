require('dotenv').config();
const sequelize = require('../sequelize/sequelize')
const fs = require('fs');





exports.getTasks = async (req, res, next) => {
    let id = req.params.id

    try {

        const tasks = await sequelize.query(`
        SELECT firstname, memo, "userId", "Tasks".id, "Tasks".hours, "Tasks".minutes, "Tasks".minutes  FROM "Users"
            JOIN "Tasks"
                ON "Users".id = "Tasks"."userId"
            WHERE "Users".id = ${id}
           `)
        res.json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};
