import React from 'react';
import classes from './error.module.sass';


const Error = ({message, click}) => {

    let {error, difficult} = classes;
   

    return (
        <div className={(click > 1) ? difficult : error}>
            <span>{message}</span>
        </div>
    );
};

export default Error;