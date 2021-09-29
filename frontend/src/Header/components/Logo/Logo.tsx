import { FC } from 'react';
import classes from './logo.module.sass';
import { Link } from "react-router-dom";
import Timer from '../../../Home/components/Time/Time';

const Logo: FC = () => {

    return (
        <>
            <Link to='/' className={classes.logo}>
                <Timer />
            </Link>
        </>
    );
};

export default Logo;