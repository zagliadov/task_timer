import { FC } from 'react';
import classes from './error.module.sass';
import {IClasses} from '../features/interfaces/interface';


type IErrorProps = {
    message: string,
    click: number,
}

const Error: FC<IErrorProps> = ({ message, click }) => {

    let { error, difficult }: IClasses = classes;

    return (
        <div className={(click > 1) ? difficult : error}>
            <span>{message}</span>
        </div>
    );
};

export default Error;