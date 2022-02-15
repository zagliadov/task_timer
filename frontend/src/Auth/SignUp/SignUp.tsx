import { FC } from 'react';
import classes from './signup.module.sass';
import { useForm } from "react-hook-form";
import { useAppDispatch } from '../../features/store';
import { registration } from '../../features/Auth/userSlice';
import { useHistory } from 'react-router-dom';
import { IRegistration } from '../../features/interfaces/interface';
import { IClasses } from '../../features/interfaces/interface';

const SignUp: FC = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const {
        wrapper,
        signup,
        input__wrapper,
        input__wrapper_submit,
    }: IClasses = classes;

    const onSubmit = (data: IRegistration | any): void => {
        dispatch(registration(data));
        setTimeout(() => {
            history.push('/signin')
        }, 10);
    };

    return (
        <section className={wrapper}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={signup}>
                <section className={input__wrapper}>
                    <label>Firstname: </label>
                    <input type='text' {...register("firstname", { required: true })} />
                </section>

                <section className={input__wrapper}>
                    <label>Lastname: </label>
                    <input type='text' {...register("lastname", { required: true })} />
                </section>

                <section className={input__wrapper}>
                    <label>Email: </label>
                    <input type='text' {...register("email", { required: true })} />
                </section>

                <section className={input__wrapper}>
                    <label>Password: </label>
                    <input type='text' {...register("password", { required: true })} />
                </section>
                <section className={input__wrapper_submit}>
                    <input type='submit' />
                </section>

            </form>
        </section>

    );
};

export default SignUp;