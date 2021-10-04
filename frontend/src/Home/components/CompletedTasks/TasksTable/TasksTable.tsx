import { useEffect, FC } from 'react';
import { zero } from '../../../../features/utils/utils'
import classes from './taskstable.module.sass';
import { useAppDispatch } from '../../../../features/store';
import { removeTask } from '../../../../features/Tasks/tasksSlice';
import { IClasses } from '../../../../features/interfaces/interface';

type ITasks = {
    id: number,
    hours: string,
    minutes: string,
    seconds: string,
    memo: string,
    userId: number,
    picture: [],
    createdAt: string,
}

type ITasksProps = {
    allCompletedTasks: ITasks[]
    setUpdate: any,
    update: boolean,
}


const TasksTable: FC<ITasksProps> = ({ allCompletedTasks, setUpdate, update }) => {

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
    }: IClasses = classes;

    const dispatch = useAppDispatch();

    let hour: number = 0,
        minutes: number = 0,
        seconds: number = 0;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCompletedTasks, hour, minutes, seconds]);

    let getTime = (h: number, m: number, s: number): string => {
        return (
            `${zero(String(h))}:${zero(String(m))}:${zero(String(s))}`
        )
    }
    let countTotalTime = (item: ITasks[]): void => {
        if (!item || item.length === 0) return
        item.forEach((task: ITasks) => {
            hour += Number(task.hours);
            minutes += Number(task.minutes);
            seconds += Number(task.seconds);
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

    countTotalTime(allCompletedTasks);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCompletedTasks]);
    return (
        <div className={wrapper}>
            <div className={header}>
                <div>Tasks</div>
                <div>Time</div>
                <div>CreatedAt</div>
            </div>
            <div className={task__wrapper}>
                {(allCompletedTasks.length > 0) && allCompletedTasks.map((task: ITasks) => {
                    return (
                        <div className={task__item} key={task.id}>
                            <div className={memo}>{task.memo}
                                <button className={remove}
                                    onClick={(): void => {
                                        dispatch(removeTask({ id: task.id }))
                                        setUpdate(!update)
                                    }}
                                >x</button>
                            </div>
                            <div className={time}>{getTime(Number(task.hours), Number(task.minutes), Number(task.seconds))}</div>
                            <span className={createdAt}>{task.createdAt}</span>
                        </div>
                    )
                })}
            </div>

            <div className={total__time}>
                <p>Total elapsed time:</p>
                <span>{zero(String(hour))}:{zero(String(minutes))}:{zero(String(seconds))} </span>
            </div>

        </div>
    );
};

export default TasksTable;