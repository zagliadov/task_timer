import React, { useEffect, useState } from 'react';
import PleaseLogIn from '../../../features/utils/PleaseLogIn/PleaseLogIn';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zero } from '../../../features/utils/utils';
import { getCompletedTasksForDays } from '../../../features/Tasks/tasksSlice';
import classes from './completedtasks.module.sass';
import TasksTable from './TasksTable/TasksTable';


const CompletedTasks = () => {

    const {
        input__wrapper,
        date__picker_start,
        date__picker_end,
        date__display,
        display__button,
        wrapper,
        change_date,
        root,
        dummy,
        select__other__dates_button,
    } = classes;


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sd, setSd] = useState('');
    const [ed, setEd] = useState('');
    const [getStartDate, setGetStartDate] = useState(true);
    const [getEndDate, setGetEndDate] = useState(false);
    const [startDateDisplay, setStartDateDisplay] = useState(false); //date
    const [endDateDisplay, setEndDateDisplay] = useState(false);     //date
    const [displayData, setDisplayData] = useState(false);

    const [update, setUpdate] = useState(false);
    const user = useSelector(state => state.user.user);
    const allCompletedTasks = useSelector(state => state.tasks.allCompletedTasks);
    const dispatch = useDispatch();


    useEffect(() => {
        setSd(`${startDate.getFullYear()}-${zero(startDate.getMonth() + 1)}-${zero(startDate.getDate())}`);
        setEd(`${endDate.getFullYear()}-${zero(endDate.getMonth() + 1)}-${zero(endDate.getDate())}`);

    }, [startDate, endDate])

    useEffect(() => {
        dispatch(getCompletedTasksForDays({ sd, ed, id: user.id }))
    }, [update, dispatch, ed, sd, user.id])

    return (
        <div className={root}>
            {!displayData && <PleaseLogIn />}

            {displayData ? //если нажата кнопка Display выодим tasks
                <>
                    <section>
                        <h2>Your completed tasks</h2>
                        <button className={select__other__dates_button}
                            onClick={() => {
                                setDisplayData(false); // Возврат к выбору дат
                                setStartDateDisplay(false);
                                setEndDateDisplay(false);
                                setGetStartDate(true);
                                setGetEndDate(false)
                            }}>Select other dates</button>

                    </section>

                    <TasksTable allCompletedTasks={allCompletedTasks} setUpdate={setUpdate} update={update} />
                </>


                :
                <section className={wrapper}>
                    {getStartDate && <div className={dummy}>
                        <p>
                            Here you can see all tasks for a specific date or for a range of dates.
                        </p>
                        <p>
                            The data is displayed in a table in which it is possible to delete a specific task.
                        </p>
                        <p>
                            The total time spent on tasks is displayed below.
                        </p>
                    </div>}
                    {
                        startDateDisplay ? <h2>Selected date:</h2>//Если выбрана первая дата
                            : <h2>Select date</h2>
                    }
                    <div className={date__display}>
                        {startDateDisplay && <p>{sd}</p>}
                        {endDateDisplay && <p>-</p>}
                        {endDateDisplay && <p>{ed}</p>}
                        {startDateDisplay &&
                            <button className={change_date}
                                onClick={() => {
                                    setStartDateDisplay(false);
                                    setEndDateDisplay(false);
                                    setGetStartDate(true);
                                    setGetEndDate(false)
                                }}    >
                                Change dates
                            </button>
                        }
                    </div>


                    <div className={input__wrapper}>
                        {getStartDate ?
                            <DatePicker
                                className={date__picker_start}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setStartDateDisplay(true);
                                    setGetEndDate(true);
                                    setGetStartDate(false)
                                }}
                                dateFormat="yyyy-MM-dd"
                                selectsStart
                                placeholderText="Start"
                                startDate={startDate}
                                endDate={endDate} />
                            : null}

                        {getEndDate ?
                            <DatePicker
                                className={date__picker_end}
                                onChange={(date) => {
                                    setEndDate(date);
                                    setEndDateDisplay(true)
                                    setGetStartDate(false)
                                    setGetEndDate(false)
                                }}
                                placeholderText="End"
                                dateFormat="yyyy-MM-dd"
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate} />
                            : null
                        }
                    </div>
                </section>
            }
            {(endDateDisplay && !displayData) &&
                <button className={display__button}
                    onClick={() => {
                        setDisplayData(true)
                        dispatch(getCompletedTasksForDays({ sd, ed, id: user.id }))
                    }}>
                    Display
                </button>
            }

        </div>
    );
};

export default CompletedTasks;