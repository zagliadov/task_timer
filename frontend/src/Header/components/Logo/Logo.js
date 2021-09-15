import React from 'react';
import classes from './logo.module.sass';
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClock } from '@fortawesome/free-solid-svg-icons';
import Timer from '../../../Home/components/Time/Time';

const Logo = () => {
   

    




    return (
        <>
            <Link to='/' className={classes.logo}>
                {/* <FontAwesomeIcon icon={faClock} className={classes.icon}/> */}
                <Timer />
            </Link>
            
        </>



    );
};

export default Logo;