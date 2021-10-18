import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const stripe = require("stripe")(String(process.env.PUBLISHABLE_KEY));


export const payment = async (req: express.Request, res: express.Response): Promise<void> => {
    const { id, amount } = req.body;
    try {

        const payment = await stripe.paymentIntents.create({
            payment_method: id,
            amount,
            currency: 'USD',
            description: 'Stripe test',
            confirm: true,
        })
        res.status(200).json({ status: payment.status })
    } catch (error: any) {
        res.status(400).json({ error })
    }
};
