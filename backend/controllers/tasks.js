require('dotenv').config();
const sequelize = require('../sequelize/sequelize')


const transformTime = (n) => {
    if (n < 10) return '0' + n;
    return n
}


exports.getTasks = async (req, res, next) => {
    let id = req.params.id
    let newDate = new Date();
    let date = `${transformTime(newDate.getFullYear().toString())}-${transformTime((newDate.getMonth() + 1).toString())}-${transformTime(newDate.getDate().toString())}`


    try {
        if (typeof (id) === "undefined") return
        const tasks = await sequelize.query(`
        SELECT firstname, memo, "userId", "Tasks".id, "Tasks"."createdAt", "Tasks".hours, "Tasks".minutes, "Tasks".seconds  FROM "Users"
            JOIN "Tasks"
                ON "Users".id = "Tasks"."userId"
            WHERE "Users".id = ${id} AND "Tasks"."createdAt" = '${date}'
           `)
        res.status(200).json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};

exports.getCompletedTasksForDays = async (req, res, next) => {
    const convertedStartDate = req.body.convertedStartDate,
        convertedEndDate = req.body.convertedEndDate,
        id = req.body.id;

    try {
        if (typeof (id) === "undefined") return
        const tasks = await sequelize.query(`
            SELECT * FROM "Tasks"
            WHERE "userId" = ${id} AND "createdAt" BETWEEN '${convertedStartDate}' AND '${convertedEndDate}'
            ORDER BY "createdAt" ASC;
        `);
        res.status(200).json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};


exports.removeTask = async (req, res, next) => {
    const id = req.body.id;

    try {
        if (typeof (id) === "undefined") return
        await sequelize.query(`
            DELETE FROM "Tasks"
                WHERE "Tasks".id = '${id}'
        `);

        res.status(200).end()

    } catch (error) {
        res.status(500);
        console.log(error.message)
    }
};


exports.showMatches = async (req, res, next) => {
    let data = req.body.data.data,
        convertedStartDate = req.body.data.convertedStartDate,
        id = req.body.data.id,
        convertedEndDate = req.body.data.convertedEndDate;


    try {
        if (typeof (id) === "undefined") return
        if (!data) {
            const tasks = await sequelize.query(`
                SELECT * FROM "Tasks"
                WHERE "createdAt" BETWEEN '${convertedStartDate}' AND '${convertedEndDate}' AND "userId" = ${id}
                ORDER BY "createdAt" ASC;
            `);
        }
        const tasks = await sequelize.query(`
            SELECT * FROM "Tasks"
            WHERE "Tasks".memo LIKE '%${data}%' AND "createdAt" BETWEEN '${convertedStartDate}' AND '${convertedEndDate}' AND "userId" = ${id}
            ORDER BY "createdAt" ASC;
        `);

        if (tasks.length === 0) return
        res.status(200).json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};