import React from 'react';
import classes from './limitation.module.sass';

const Limitation = () => {


    return (
        <div className={classes.option_wrapper}>
            <section>
                <h2>Set a time limit?</h2>
                <p>Set the time limit for which you want to complete the task</p>
                <p>
                    Upon expiration of the time limit, you will be asked whether to continue
                    or stop the task execution timer
                </p>
                <div>
                    <h3>This feature is under development.</h3>
                </div>
                
            </section>

        </div>
    );
};

export default Limitation;