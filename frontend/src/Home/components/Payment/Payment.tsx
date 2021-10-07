import { FC } from 'react';
import classes from './payment.module.sass';
import { IClasses } from '../../../features/interfaces/interface';
import { useAppSelector, RootState, useAppDispatch } from '../../../features/store';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { payment } from '../../../features/Auth/userSlice';

const Payment: FC = () => {

    const {
        black__theme_payment,
        white__theme_payment,
    }: IClasses = classes;
    const stripe = useStripe();
    const elements = useElements();
    // const [succeeded, setSucceeded] = useState(false);
    // const [error, setError] = useState(null);
    // const [processing, setProcessing] = useState('');
    // const [disabled, setDisabled] = useState(true);
    // const [clientSecret, setClientSecret] = useState('');

    const color = useAppSelector((state: RootState) => state.user.color);
    const dispatch = useAppDispatch();

    const checkoutFormOptions = {
        hidePostalCode: true,
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    }
    const handleChange = async (event: any) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        // setDisabled(event.empty);
        // setError(event.error ? event.error.message : "");
        console.log(event)
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) return
        dispatch(payment(event))
    }


    return (
        <div className={color ? white__theme_payment : black__theme_payment}>


            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}
                    options={checkoutFormOptions} id="card-element" />
                <button type="submit" disabled={!stripe} id="submit">
                    Pay
                </button>
            </form>
        </div>
    );
};

export default Payment;