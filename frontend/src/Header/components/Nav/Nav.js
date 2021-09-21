import React from 'react';
import classes from './nav.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { userRemove, tokenRemove } from '../../../features/Auth/userSlice'
import { removeTimeLimit } from '../../../features/Timer/timerSlice'

const Nav = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const clean = () => {
        if (!localStorage.getItem('token')) return
        localStorage.removeItem('token');
        dispatch(userRemove());
        dispatch(tokenRemove())
        dispatch(removeTimeLimit());
    }
    return (
        <nav className={classes.nav}>
            {(user.role === 'user' || user.role === 'admin') ?
                <>
                    <Link to='/' className={classes.link}
                        onClick={() => {
                            clean()
                        }}
                    >Sign Out</Link>
                </>
                :
                <>
                    <Link to='/signin' 
                    onClick={() => localStorage.removeItem('token')}
                    className={classes.link}>Sign In</Link>
                    <Link to='/signup' className={classes.link} >Sign Up</Link>
                </>
            }
            


        </nav>
    );
};

export default Nav;