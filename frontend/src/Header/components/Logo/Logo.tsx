import { FC } from 'react';
import classes from './logo.module.sass';
import { Link } from "react-router-dom";
import Timer from '../../../Home/components/Time/Time';
import { IClasses } from '../../../features/interfaces/interface';

const Logo: FC = () => {

    const { logo }: IClasses = classes;

    return (
        <>
            <Link to='/' className={logo}>
                <Timer />
            </Link>
        </>
    );
};

export default Logo;