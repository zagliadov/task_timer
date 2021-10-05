import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from '../sequelize/sequelize';

interface ITimeStampSaveTaskPackage {
    hours: string,
    minutes: string,
    seconds: string,
    memo: string,
}

export const saveTaskPackage = async (req: express.Request, res: express.Response): Promise<void> => {
    const { hours, minutes, seconds, memo }: ITimeStampSaveTaskPackage = req.body.timeStamp;
    const id: string = req.body.id;
    const date: Date = req.body.date;
    try {
        await sequelize.query(`
            INSERT INTO "Tasks"(hours, minutes, seconds, memo, "userId", picture, "createdAt")
                VALUES('${hours}','${minutes}', '${seconds}', '${memo}', '${id}', '{}', '${date}')
           `)
        res.status(201).json({ message: 'resolved' });
    } catch (error) {
        console.log(error);
    }
};

interface IUpdateTimeRequest {
    hours: string,
    minutes: string,
    seconds: string,
    memo: string,
    usid: number,
    taskId: number,
    date: Date,
}

export const updateTime = async (req: express.Request, res: express.Response): Promise<void> => {
    const { hours, minutes, seconds, memo, usid, taskId, date }: IUpdateTimeRequest = req.body;
    try {
        await sequelize.query(`
        UPDATE "Tasks" SET "hours" = ${hours}, "minutes" = ${minutes}, "seconds" = ${seconds}
        WHERE "memo" = '${memo}' AND "userId" = '${usid}' AND id = '${taskId}' AND "createdAt" = '${date}'
           `);
        res.status(200).json({ message: 'resolved' })

    } catch (error) {
        console.log(error)
    }
};

