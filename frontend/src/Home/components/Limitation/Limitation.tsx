import { FC, useEffect, useState } from 'react';
import classes from './limitation.module.sass';
import { useAppSelector, useAppDispatch } from '../../../features/store';
import { RootState } from '../../../features/store';
import { setTimeLimit } from '../../../features/Timer/timerSlice';
import { IClasses } from '../../../features/interfaces/interface';
import TotalElapsedTime from './components/TotalElapsedTime/TotalElapsedTime';

type ILimitationProps = {
    start: boolean,
}

type ITask = {
    firstname: string,
    createdAt: string,
    hours: string,
    id: number,
    memo: string,
    minutes: string,
    seconds: string,
    userId: number,
}

const Limitation: FC<ILimitationProps> = ({ start }) => {

    const dispatch = useAppDispatch();
    const color = useAppSelector((state: RootState) => state.user.color);
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
    const [hasTimeFrameChanged, setHasTimeFrameChanged] = useState<boolean>(false);
    const { danger,
        lite,
        input_timeLimit,
        wrapper_input_timeLimit,
        white__theme_option_wrapper,
        black__theme_option_wrapper }: IClasses = classes;
    let hour: number = 0 || 1,
        minutes: number = 0 || 1,
        seconds: number = 0 || 1;


    let countTotalTime = (item: ITask[]) => {
        if (!item) return
        item.forEach((task: ITask) => {
            hour += Number(task.hours);
            minutes += Number(task.minutes);
            seconds += Number(task.seconds);
            while (seconds > 60) {
                minutes++;
                seconds -= 60;
            }
            while (minutes >= 60) {
                hour++;
                minutes -= 60;
            }

        })
        localStorage.setItem('hour', String(hour));
    }
    /**React Hook useEffect has a complex expression in the dependency array.
     * Extract it to a separate variable so it can be statically checked  
     * react-hooks/exhaustive-deps 
     */
    let timeLimit: string | number = localStorage.getItem('timeLimit') || 0;
    let expdep: boolean = !start;

    useEffect(() => {

    }, [expdep, start, hour, timeLimit]);
    countTotalTime(tasks);

    return (
        <div className={color ? white__theme_option_wrapper : black__theme_option_wrapper}>
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
                        defaultValue={Number(localStorage.getItem('timeLimit')) || 3}
                        onChange={(e) => {
                            setHasTimeFrameChanged(!hasTimeFrameChanged);
                            dispatch(setTimeLimit(String(e.target.value)));
                            localStorage.setItem('timeLimit', String(e.target.value))

                        }} />
                    <span>Enter time limit</span>
                </div>

                <div>
                    <h3>This feature is under development.</h3>
                </div>
                <TotalElapsedTime hour={hour} minutes={minutes} seconds={seconds} danger={danger} lite={lite} />

            </section>

        </div>
    );
};

export default Limitation;