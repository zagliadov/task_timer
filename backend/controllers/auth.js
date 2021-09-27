require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize/sequelize')

exports.registration = async (req, res, next) => {
    const { firstname, lastname, email, date, password, role } = req.body;
    try {
        await sequelize.query(`
       INSERT INTO "Users"(firstname, lastname, email, password, role, "createdAt", "updatedAt")
            VALUES('${firstname}','${lastname}', '${email}', '${password}', '${role}', '${date}', '${date}')
       `)
       res.status(201).end();
    } catch (error) {
        console.log(error.message)
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await sequelize.query(`
        SELECT id, firstname, lastname, email, password, role FROM "Users"
        WHERE email = '${email}'
    `);
        if (!user[1].rowCount) return res.end()
        if (password !== user[0][0].password) return res.json({ message: 'Wrong password' })

        const token = jwt.sign({
            id: user[0][0].id,
            firstname: user[0][0].firstname,
            lastname: user[0][0].lastname,
            email: user[0][0].email,
            role: user[0][0].role,
        }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN })
        res.status(200).json(token)
    } catch (error) {
        console.log(error.message)
    }
};


exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) return
        res.status(200).json(result)

    })
}