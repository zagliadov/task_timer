import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../sequelize/sequelize';


const transformTime = (n: number): string | number => {
    if (n < 10) return '0' + n;
    return n
}

interface IGetTasks extends IShowMatchesTasks {}
export const getTasks = async (req: express.Request, res: express.Response): Promise<void> => {

    let id = req.params.id
    let newDate: Date = new Date();
    let date: string = `${transformTime(Number(newDate.getFullYear()))}-${transformTime((Number(newDate.getMonth() + 1)))}-${transformTime(Number(newDate.getDate()))}`

    try {
        if (typeof (id) === "undefined") return
        const tasks: IGetTasks[] = await sequelize.query(`
        SELECT firstname, memo, "userId", "Tasks".id, "Tasks"."createdAt", "Tasks".hours, "Tasks".minutes, "Tasks".seconds  FROM "Users"
            JOIN "Tasks"
                ON "Users".id = "Tasks"."userId"
            WHERE "Users".id = ${id} AND "Tasks"."createdAt" = '${date}'
           `, { type: QueryTypes.SELECT })
        res.status(200).json(tasks)

    } catch (error) {
        console.log(error)
    }
};

interface IGetCompletedTasksForDays extends IShowMatchesTasks {}
export const getCompletedTasksForDays = async (req: express.Request, res: express.Response): Promise<void> => {
    const convertedStartDate: string = req.body.convertedStartDate,
        convertedEndDate: string = req.body.convertedEndDate,
        id: string = req.body.id;

    try {
        if (typeof (id) === "undefined") return
        const tasks: IGetCompletedTasksForDays[] = await sequelize.query(`
            SELECT * FROM "Tasks"
            WHERE "userId" = ${id} AND "createdAt" BETWEEN '${convertedStartDate}' AND '${convertedEndDate}'
            ORDER BY "createdAt" ASC;
        `, { type: QueryTypes.SELECT });
        res.status(200).json(tasks)

    } catch (error) {
        console.log(error)
    }
};


export const removeTask = async (req: express.Request, res: express.Response): Promise<void> => {
    const id: string = req.body.id;

    try {
        if (typeof (id) === "undefined") return
        await sequelize.query(`
            DELETE FROM "Tasks"
                WHERE "Tasks".id = '${id}'
        `);
        res.status(200).json({ message: 'Resolved' })

    } catch (error) {
        res.status(500);
        console.log(error)
    }
};

interface IShowMatchesTasks {
    createdAt: string,
    hours: string,
    id: number,
    memo: string,
    minutes: string,
    picture: [],
    seconds: string,
    userId: number,
}

export const showMatches = async (req: express.Request, res: express.Response): Promise<void> => {
    let data: string = req.body.data.data,
        convertedStartDate: string = req.body.data.convertedStartDate,
        id: string = req.body.data.id,
        convertedEndDate: string = req.body.data.convertedEndDate;

    try {
        if (typeof (id) === "undefined") return
        const tasks: IShowMatchesTasks[]  = await sequelize.query(`
            SELECT * FROM "Tasks"
            WHERE "Tasks".memo LIKE '%${data}%' AND "createdAt" BETWEEN '${convertedStartDate}' AND '${convertedEndDate}' AND "userId" = ${id}
            ORDER BY "createdAt" ASC;
        `, { type: QueryTypes.SELECT });

        if (tasks.length === 0) return
        res.status(200).json(tasks)

    } catch (error) {
        console.log(error)
    }
};