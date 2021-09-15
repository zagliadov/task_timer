import React from 'react';
import classes from './pleaselogin.module.sass';
import { useSelector } from 'react-redux'


const PleaseLogIn = () => {
    const user = useSelector(state => state.user.user)
    const { wrapper } = classes



    return (
        <h3 className={wrapper}>
            Hello {user.firstname ? user.firstname : 'guest! Please log in'}
        </h3>
    );
};

export default PleaseLogIn;