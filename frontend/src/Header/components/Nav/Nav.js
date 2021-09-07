import React from 'react';
import classes from './nav.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {userRemove, tokenRemove} from '../../../features/Auth/userSlice'

const Nav = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const clean = () => {
        if(!localStorage.getItem('token')) return
        localStorage.removeItem('token');
        dispatch(userRemove());
        dispatch(tokenRemove())
    }
    return (
        <nav className={classes.nav}>
            {(user.role === 'user' || user.role === 'admin') ?
                <>
                    <Link to='/' className={classes.link}
                        onClick={() => clean()}
                    >Sign Out</Link>
                </> 
                : 
                <>
                    <Link to='/signin' className={classes.link}>Sign In</Link>
                    <Link to='/signup' className={classes.link}>Sign Up</Link>
                </>
                }
                <Link to='/somesome' className={classes.link}>Some</Link>

                <Link to='/somesomesome' className={classes.link}>Some-Some</Link>

        </nav>
    );
};

export default Nav;