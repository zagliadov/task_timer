import React, { useEffect, useState } from 'react';
import classes from './limitation.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { zero } from '../../../features/utils/utils';
import { setTimeLimit } from '../../../features/Timer/timerSlice';

const Limitation = ({ start }) => {

    const dispatch = useDispatch();
    const [hasTimeFrameChanged, setHasTimeFrameChanged] = useState(false);
    const tasks = useSelector(state => state.tasks.tasks);
    const { danger, lite, input_timeLimit, wrapper_input_timeLimit } = classes;
    let hour = 0 || 1,
        minutes = 0 || 1,
        seconds = 0 || 1;


    let countTotalTime = (item) => {
       if(!item) return
        item.forEach(task => {
            if (task.hours === 0) return
            hour += +task.hours
            if (task.minutes === 0) return
            minutes += +task.minutes
            if (task.seconds === 0) return
            seconds += +task.seconds
            while (seconds > 60) {
                minutes++;
                seconds -= 60;
            }
            while (minutes >= 60) {
                hour++;
                minutes -= 60
            }

        })
        localStorage.setItem('hour', hour)
    }
    /**React Hook useEffect has a complex expression in the dependency array.
     * Extract it to a separate variable so it can be statically checked  
     * react-hooks/exhaustive-deps 
     */
    let timeLimit = localStorage.getItem('timeLimit');
    let expdep = !start;
    useEffect(() => {

    }, [expdep, start, hour, timeLimit])
    // if(!start) return
    // if(!tasks) return
     countTotalTime(tasks)
  



    return (
        <div className={classes.option_wrapper}>
            <section>
                <h2>Set a time limit?</h2>
                <p>Set the time limit for which you want to complete the task</p>
                <p>
                    Upon expiration of the time limit, you will be asked whether to continue
                    or stop the task execution timer
                </p>
                <div className={wrapper_input_timeLimit}>
                     <input type='number'
                    min='1' max='24'
                    className={(input_timeLimit)}
                    defaultValue={localStorage.getItem('timeLimit') || 3}
                    onChange={(e) => {
                        setHasTimeFrameChanged(!hasTimeFrameChanged);
                        dispatch(setTimeLimit(e.target.value));
                        localStorage.setItem('timeLimit', e.target.value)
                        
                    }} />
                    <span>Enter time limit</span>
                </div>
               
                <div>
                    <h3>This feature is under development.</h3>
                </div>
                <div>
                    <p>Total elapsed time</p>
                    <span className={parseInt(localStorage.getItem('hour')) >= parseInt(localStorage.getItem('timeLimit')) ? danger : lite}>
                        {zero(hour)}:{zero(minutes)}:{zero(seconds)}
                    </span>
                    {(parseInt(localStorage.getItem('hour')) >= parseInt(localStorage.getItem('timeLimit'))) ? <span> You have exceeded the time limit</span> : null}
                </div>

            </section>

        </div>
    );
};

export default Limitation;