import React from 'react';
import classes from './signup.module.sass';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { registration } from '../../features/Auth/userSlice';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(registration(data));
        setTimeout(() => {
            history.push('/signin')
        }, 1000);

    };


    return (
        <section className={classes.wrapper}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.signup}>
                <section className={classes.input__wrapper}>
                    <label>Firstname: </label>
                    <input type='text' {...register("firstname", { required: true })} />
                </section>

                <section className={classes.input__wrapper}>
                    <label>Lastname: </label>
                    <input type='text' {...register("lastname", { required: true })} />
                </section>

                <section className={classes.input__wrapper}>
                    <label>Email: </label>
                    <input type='text' {...register("email", { required: true })} />
                </section>

                <section className={classes.input__wrapper}>
                    <label>Password: </label>
                    <input type='text' {...register("password", { required: true })} />
                </section>
                <section className={classes.input__wrapper_submit}>
                    <input type='submit' />
                </section>

            </form>
        </section>

    );
};

export default SignUp;