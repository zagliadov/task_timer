import React from 'react';
import classes from './wrapper.module.sass';

const Wrapper = ({children}) => {
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
};

export default Wrapper;