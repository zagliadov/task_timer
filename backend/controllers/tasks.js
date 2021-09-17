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

        const tasks = await sequelize.query(`
        SELECT firstname, memo, "userId", "Tasks".id, "Tasks"."createdAt", "Tasks".hours, "Tasks".minutes, "Tasks".seconds  FROM "Users"
            JOIN "Tasks"
                ON "Users".id = "Tasks"."userId"
            WHERE "Users".id = ${id} AND "Tasks"."createdAt" = '${date}'
           `)
        res.json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};

exports.getCompletedTasksForDays = async (req, res, next) => {
    const startDate = req.body.sd,
        endDate = req.body.ed,
        id = req.body.id;
    
    
    try {
        const tasks = await sequelize.query(`
            SELECT * FROM "Tasks"
            WHERE "userId" = ${id} AND "createdAt" BETWEEN '${startDate}' AND '${endDate}'
            ORDER BY "createdAt" ASC;
        `);
        res.json(tasks[0])

    } catch (error) {
        console.log(error.message)
    }
};


exports.removeTask = async (req, res, next) => {
    const id = req.body.id
    
    try {
        await sequelize.query(`
            DELETE FROM "Tasks"
                WHERE "Tasks".id = '${id}'
        `);
        
        res.end()

    } catch (error) {
        console.log(error.message)
    }
};