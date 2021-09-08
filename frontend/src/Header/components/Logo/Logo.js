import React from 'react';
import classes from './logo.module.sass';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


const Logo = () => {
    const m = moment();

    let hours = moment().hours();
    let second = moment().second();
    let minutes = moment().minutes();
    // setInterval(() => {
    //     console.log(hours + ':' + minutes + ':' + second++)
    // }, 1000)
    
    //console.log(moment('12:16','HH:mm').minutes());






    return (
        <>
            <Link to='/' className={classes.logo}>
                <FontAwesomeIcon icon={faClock} className={classes.icon}/>
            </Link>
            
        </>



    );
};

export default Logo;