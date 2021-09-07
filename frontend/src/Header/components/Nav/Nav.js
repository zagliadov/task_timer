import React from 'react';
import classes from './nav.module.sass';
import { Link } from "react-router-dom";


const Nav = () => {
    return (
        <nav className={classes.nav}>
            <Link to='/signin' className={classes.link}>Sign In</Link>
            <Link to='/signup' className={classes.link}>Sign Up</Link>
        </nav>
    );
};

export default Nav;