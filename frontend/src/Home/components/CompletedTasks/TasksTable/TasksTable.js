import React, { useEffect } from 'react';
import { zero } from '../../../../features/utils/utils'
import classes from './taskstable.module.sass';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../../../features/Tasks/tasksSlice';

const TasksTable = ({ allCompletedTasks, setUpdate, update }) => {

    const {
        wrapper,
        task__item,
        time,
        memo,
        createdAt,
        remove,
        header,
        total__time,
        task__wrapper,
    } = classes;
    const dispatch = useDispatch();
    let hour = 0,
        minutes = 0,
        seconds = 0;

    useEffect(() => {

    }, [allCompletedTasks])
    let getTime = (h, m, s) => {
        return (
            `${zero(h)}:${zero(m)}:${zero(s)}`
        )
    }
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
        });
    }
    countTotalTime(allCompletedTasks)

    return (
        <div className={wrapper}>
            <div className={header}>
                <div>Tasks</div>
                <div>Time</div>
                <div>CreatedAt</div>
            </div>
            <div className={task__wrapper}>
                {allCompletedTasks.map(task => {
                    return (
                        <div className={task__item} key={task.id}>
                            <div className={memo}>{task.memo}
                                <button className={remove}
                                    onClick={() => {
                                        dispatch(removeTask({ id: task.id }))
                                        setUpdate(!update)
                                    }}
                                >x</button>
                            </div>
                            <div className={time}>{getTime(task.hours, task.minutes, task.seconds)}</div>
                            <span className={createdAt}>{task.createdAt}</span>
                        </div>
                    )
                })}
            </div>

            <div className={total__time}>
                <p>Total elapsed time:</p>
                <span>{zero(hour)}:{zero(minutes)}:{zero(seconds)} </span>
            </div>
            
        </div>
    );
};

export default TasksTable;