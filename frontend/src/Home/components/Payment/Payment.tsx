import { FC} from 'react';
import './payment.sass';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useAppDispatch, useAppSelector, RootState } from '../../../features/store';
import { payment } from '../../../features/Auth/userSlice';

const checkoutFormOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
        },
        invalid: {
            color: '#9e2146',
        },
    },
    hidePostalCode: true,
}

const Payment: FC = () => {

    const stripe: any = useStripe(),
        elements: any = useElements(),
        dispatch = useAppDispatch(),
        paymentStatus = useAppSelector((state: RootState) => state.user.paymentStatus);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { error, paymentMethod }: any = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (!error) {
            const { id } = paymentMethod;
            dispatch(payment({ id, amount: 1000 }));
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement options={checkoutFormOptions} />
                <input type='submit' defaultValue='Pay' />
            </form>
            <p>{paymentStatus}</p>
        </>

    )
};

export default Payment;