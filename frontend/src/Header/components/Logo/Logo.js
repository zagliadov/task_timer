import React from 'react';
import classes from './logo.module.sass';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to='/' className={classes.logo}>
            LOGO
        </Link>
    );
};

export default Logo;