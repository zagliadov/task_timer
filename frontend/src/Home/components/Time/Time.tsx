import { FC } from 'react';
import classes from './time.module.sass';
import { IClasses } from '../../../features/interfaces/interface';

const Time: FC = () => {

    const {clock_wrapper, clock}: IClasses = classes
    
    return (
        <div className={clock_wrapper}>
            <div className={clock}>
            </div>
        </div>
    );
};

export default Time;