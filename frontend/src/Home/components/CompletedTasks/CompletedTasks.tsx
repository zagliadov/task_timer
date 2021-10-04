import { FC, useEffect, useState } from 'react';
import PleaseLogIn from '../../../features/utils/PleaseLogIn/PleaseLogIn';
import { useAppSelector, useAppDispatch } from '../../../features/store';
import { RootState } from '../../../features/store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zero } from '../../../features/utils/utils';
import { getCompletedTasksForDays } from '../../../features/Tasks/tasksSlice';
import classes from './completedtasks.module.sass';
import TasksTable from './TasksTable/TasksTable';
import { showMatches } from '../../../features/Tasks/tasksSlice';
import { IClasses } from '../../../features/interfaces/interface';

const CompletedTasks: FC = () => {

    const {
        input__wrapper,
        date__picker_start,
        date__picker_end,
        date__display,
        display__button,
        wrapper,
        change_date,
        input_for_iterating_over_letters,
        root,
        dummy,
        wrapper_input_for_iterating_over_letters,
        select__other__dates_button,
    }: IClasses = classes;

    const allCompletedTasks = useAppSelector((state: RootState) => state.tasks.allCompletedTasks),
        user = useAppSelector((state: RootState) => state.user.user);
    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date>(new Date()),
        [rawEndDate, setRawEndDate] = useState<Date>(new Date()),
        [convertedStartDate, setConvertedStartDate] = useState<string>(''),
        [convertedEndDate, setConvertedEndDate] = useState<string>(''),
        [getStartDate, setGetStartDate] = useState<boolean>(true),
        [getEndDate, setGetEndDate] = useState<boolean>(false),
        [startDateDisplay, setStartDateDisplay] = useState<boolean>(false), //date
        [endDateDisplay, setEndDateDisplay] = useState<boolean>(false),    //date
        [displayData, setDisplayData] = useState<boolean>(false),
        [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        setConvertedStartDate(`${startDate.getFullYear()}-${zero(String(startDate.getMonth() + 1))}-${zero(String(startDate.getDate()))}`);
        setConvertedEndDate(`${rawEndDate.getFullYear()}-${zero(String(rawEndDate.getMonth() + 1))}-${zero(String(rawEndDate.getDate()))}`);
    }, [startDate, rawEndDate])

    useEffect(() => {
        dispatch(getCompletedTasksForDays({ convertedStartDate, convertedEndDate, id: user?.id }))
    }, [update, dispatch, convertedEndDate, convertedStartDate, user?.id])

    return (
        <div className={root}>
            {!displayData && <PleaseLogIn />}

            {displayData ? //если нажата кнопка Display выодим tasks
                <>
                    <section>
                        <h2>Your completed tasks</h2>
                        <div className={wrapper_input_for_iterating_over_letters}>
                            <input type='text'
                                className={input_for_iterating_over_letters}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(showMatches({ data: e.target.value, convertedStartDate, convertedEndDate, id: user?.id }))} />
                            <span>Display a specific tasks</span>
                        </div>

                        <button className={select__other__dates_button}
                            onClick={(): void => {
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
                        {startDateDisplay && <p>{convertedStartDate}</p>}
                        {endDateDisplay && <p>-</p>}
                        {endDateDisplay && <p>{convertedEndDate}</p>}
                        {startDateDisplay &&
                            <button className={change_date}
                                onClick={(): void => {
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
                                onChange={(date: Date) => {
                                    setStartDate(date);
                                    setStartDateDisplay(true);
                                    setGetEndDate(true);
                                    setGetStartDate(false)
                                }}
                                dateFormat="yyyy-MM-dd"
                                selectsStart
                                placeholderText="Start"
                                startDate={startDate}
                                endDate={rawEndDate} />
                            : null}

                        {getEndDate ?
                            <DatePicker
                                className={date__picker_end}
                                onChange={(date: Date) => {
                                    setRawEndDate(date);
                                    setEndDateDisplay(true)
                                    setGetStartDate(false)
                                    setGetEndDate(false)
                                }}
                                placeholderText="End"
                                dateFormat="yyyy-MM-dd"
                                selectsEnd
                                startDate={startDate}
                                endDate={rawEndDate} />
                            : null
                        }
                    </div>
                </section>
            }
            {(endDateDisplay && !displayData) &&
                <button className={display__button}
                    onClick={(): void => {
                        setDisplayData(true)
                        dispatch(getCompletedTasksForDays({ convertedStartDate, convertedEndDate, id: user?.id }))
                    }}>
                    Display
                </button>
            }
        </div>
    );
};

export default CompletedTasks;