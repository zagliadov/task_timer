import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const stripe = require("stripe")(String(process.env.PUBLISHABLE_KEY));




exports.payment = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { items } = req.body;
        const calculateOrderAmount = (items: any) => {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            return 1400;
        };
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd"
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.log(error)
    }
};
