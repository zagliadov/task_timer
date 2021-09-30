import { useEffect, FC } from 'react';
import classes from './signin.module.sass';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector, RootState } from '../../features/store';
import { login, verifyToken } from '../../features/Auth/userSlice';
import { useHistory } from 'react-router';
import { ILogin } from '../../features/interfaces/interface';


const SignIn: FC = () => {

    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const token = useAppSelector((state: RootState) => state.user.token);
    const history = useHistory();

    const onSubmit = (data: ILogin): void => {
        dispatch(login(data));
    };
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        dispatch(verifyToken(localStorage.getItem('token')));
        history.push('/')
        return () => {
            console.log('Component will be unmount');
        }
    }, [dispatch, token, history])


    return (
        <section className={classes.wrapper}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.signin}>
                <section className={classes.input__wrapper}>
                    <label>Email: </label>
                    <input type='text' {...register("email", { required: true })} />
                </section>

                <section className={classes.input__wrapper}>
                    <label>Password: </label>
                    <input type='text' {...register("password", { required: true })} />
                </section>

                <section className={classes.input__wrapper_submit}>
                    <input type='submit' value='Sign In' />
                </section>

            </form>
        </section>
    );
};

export default SignIn;