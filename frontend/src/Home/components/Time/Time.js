import React from 'react';
import classes from './time.module.sass';
const Time = () => {


    return (
        <div className={classes.clock_wrapper}>
            <div className={classes.clock}>
                {/* <div> */}
                    <span>12</span>
                    <span>3</span>
                    <span>6</span>
                    <span>9</span>
                {/* </div> */}

            </div>
        </div>

    );
};

export default Time;