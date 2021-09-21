import React, { useEffect } from 'react';
import classes from './limitation.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { zero } from '../../../features/utils/utils';
import { setTimeLimit } from '../../../features/Timer/timerSlice';

const Limitation = ({ start }) => {

    //const [timeLimit, setTimeLimit] = useState(null);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    let timeLimit = useSelector(state => state.timer.timeLimit);
    const { danger, lite } = classes;
    let hour = 0,
        minutes = 0,
        seconds = 0;




    let countTotalTime = (item) => {
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
    }
    /**React Hook useEffect has a complex expression in the dependency array.
     * Extract it to a separate variable so it can be statically checked  
     * react-hooks/exhaustive-deps 
     */
    let expdep = !start;
    useEffect(() => {

    }, [expdep, start])
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
                <input type='number'
                    min='0' max='24'
                    onChange={(e) => dispatch(setTimeLimit(e.target.value))} />
                <div>
                    <h3>This feature is under development.</h3>
                </div>
                <div>
                    <p>Total elapsed time</p>
                    <span className={(hour >= +timeLimit) ? danger : lite}>
                        {zero(hour)}:{zero(minutes)}:{zero(seconds)}
                    </span>
                    {(hour >= +timeLimit) ? <span> You have exceeded the time limit</span> : null}
                </div>

            </section>

        </div>
    );
};

export default Limitation;