import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express(),
    PORT: string = process.env.PORT || String(8080);
import { sequelize } from './sequelize/sequelize';
app.use(cors());
app.use(express.json());

app.use('/api/timer', require('./routes/timer.ts'));
app.use('/api/auth', require('./routes/auth.ts'));
app.use('/api/tasks', require('./routes/tasks.ts'));

sequelize.sync().then(() => {
    app.listen(PORT, async (): Promise<void> => {
        console.log(`Server run on: ${PORT}`)
    })
})