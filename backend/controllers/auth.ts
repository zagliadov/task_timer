import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../sequelize/sequelize';

interface IRegistrationRequest {
    firstname: string,
    lastname: string,
    email: string,
    date: string,
    password: string,
    role: string,
}
exports.registration = async (req: express.Request, res: express.Response): Promise<void> => {
    const { firstname, lastname, email, date, password, role }: IRegistrationRequest = req.body;
    try {
        await sequelize.query(`
       INSERT INTO "Users"(firstname, lastname, email, password, role, "createdAt", "updatedAt")
            VALUES('${firstname}','${lastname}', '${email}', '${password}', '${role}', '${date}', '${date}')
       `);
        res.status(201).json({ message: 'User create' });
    } catch (error) {
        console.log(error)
    }
};

interface ILoginRequest {
    email: string,
    password: string,
}
interface IUserLogin {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
}
exports.login = async (req: express.Request, res: express.Response): Promise<any> => {
    const { email, password }: ILoginRequest = req.body;
    try {
        const user: IUserLogin[] = await sequelize.query(`
            SELECT id, firstname, lastname, email, password, role FROM "Users"
            WHERE email = '${email}'
        `, { type: QueryTypes.SELECT });

        if (!user[0]) return
        if (password !== user[0].password) return res.json({ message: 'Login or password is incorrect' })

        const token = jwt.sign({
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
            role: user[0].role,
        }, process.env.JWT_SECRET as string, { expiresIn: process.env.EXPIRES_IN as string })
        res.status(200).json(token);

    } catch (error) {
        console.log(error)
    }
};

exports.verifyToken = async (req: express.Request, res: express.Response): Promise<any> => {
    const authHeader: string | undefined = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];
    try {
        if (!token) return
        jwt.verify(String(token), process.env.JWT_SECRET as string, (err, result) => {
            if (err) return
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error)
    }

}