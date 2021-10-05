import { useEffect, FC, useState } from 'react';
import classes from './signin.module.sass';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector, RootState } from '../../features/store';
import { login, verifyToken } from '../../features/Auth/userSlice';
import { useHistory } from 'react-router';
import { IClasses } from '../../features/interfaces/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn: FC = () => {

    interface ILogin {
        email: string;
        password: string;
    }
    const [inputType, setInputType] = useState<string>('password');
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const token = useAppSelector((state: RootState) => state.user.token);
    const status = useAppSelector((state: RootState) => state.user.status);
    const history = useHistory();
    const {
        wrapper,
        signin,
        password,
        messageFromServer,
        input__wrapper,
        input__wrapper_submit,
    }: IClasses = classes;

    const onSubmit = (data: ILogin): void => {
        dispatch(login(data));
    };
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        dispatch(verifyToken(localStorage.getItem('token')));
        history.push('/');
    }, [dispatch, token, history]);

    const handleChangeInputTypeOnText = (): void => {
        setInputType('text');
    }
    const handleChangeInputTypeOnPassword = (): void => {
        setInputType('password');
    }

    return (
        <section className={wrapper}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={signin}>
                <section className={input__wrapper}>
                    <label>Email: </label>
                    <input type='text' {...register("email", { required: true })} />
                </section>

                <section className={input__wrapper}>
                    <label >Password: </label>
                    <input type={inputType} {...register("password", { required: true })} />
                </section>
                <div className={password}>
                    {(inputType === 'password') ?
                        <FontAwesomeIcon icon={faEyeSlash} onClick={() => {
                            handleChangeInputTypeOnText();
                        }} />
                        :
                        <FontAwesomeIcon icon={faEye} onClick={() => {
                            handleChangeInputTypeOnPassword();
                        }} />
                    }
                </div>
                <div className={messageFromServer}>{(status && (status !== 'resolved')) && <label>{status}</label>}</div>
                <section className={input__wrapper_submit}>
                    <input type='submit' value='Sign In' />
                </section>
            </form>
        </section>
    );
};

export default SignIn;