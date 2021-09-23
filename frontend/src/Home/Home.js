import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './home.module.sass';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { transformTime } from '../features/utils/utils';
import { saveTaskPackage, updateTime } from '../features/Timer/timerSlice';
import { getTasks } from '../features/Tasks/tasksSlice';
import Options from './components/Options/Options';
import Error from '../Error/Error';
import { zero } from '../features/utils/utils';


const Home = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [start, setStart] = useState(false); // Отображение кнопки play pause
    const [noMemo, setNoMemo] = useState(false);
    let [click, setClick] = useState(0); // Сколько раз пользователь нажал плей без указания memo
    let memo = useRef('');
    let [saveData, setSaveData] = useState(true)
    let timeStamp = {};
    let [seconds, setSeconds] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [hours, setHours] = useState(0);
    let mydate = moment().format()
    let weekDayName = moment(mydate).format('dddd');
    let date = new Date();
    let day = transformTime(date.getDate())
    let month = moment().format('MMMM');
    let tasks = useSelector(state => state.tasks.tasks);



    let hour = 0,
        minute = 0,
        second = 0;

    let countTotalTime = (item) => {
        item.forEach(task => {
            if (task.hours === 0) return
            hour += +task.hours
            if (task.minutes === 0) return
            minute += +task.minutes
            if (task.seconds === 0) return
            second += +task.seconds
            while (second > 60) {
                minute++;
                second -= 60;
            }
            while (minute >= 60) {
                hour++;
                minute -= 60
            }

        })
        if (hour === 0) return
        localStorage.setItem('hour', hour)
    }
    countTotalTime(tasks);

    useEffect(() => {
       
    }, [hour,])


    

    const timer = useRef(null);
    let tick = () => {
        //Запускает и оставнавливает счетчик
        if (!timer.current) {
            timer.current = setInterval(() => setSeconds(seconds => +seconds + 1), 1)

        } else {
            clearInterval(timer.current);
            timer.current = null
        }
    }

    let timeFrameControl = (seconds, minutes, hours) => {
        //Ф. не дает выйти за рамки 60 секунд, минут, часов
        if (seconds > 59) {
            setSeconds(0)
            setMinutes(minutes => +minutes + 1)
        }
        if (minutes > 59) {
            setMinutes(0)
            setHours(hours => +hours + 1)
        }
        if (hours > 59) {
            setHours(0)
        }
    }

    useEffect(() => {
        timeFrameControl(+seconds, +minutes, +hours)
    }, [seconds, minutes, hours]);

    useEffect(() => {
        if (typeof (user.id) === 'undefined') return
        dispatch(getTasks(user.id))
    }, [dispatch, user.id, start])


    let getTime = (h, m, s) => {
        //Собирает значения полей времени в обьект
        timeStamp = {
            hours: h,
            minutes: m,
            seconds: s,
        }
        
    }
    const resetTimer = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    }

    const handlePlay = (e) => {
        /**
         * Не дает включить счетчик если memo не заполнен
         * Следит за memo в инпуте и сравнивает с мемо в локальном хранилище
         * и если они идентичны продолжаешь считать время, если нет сбрасывает время
         * и пишет новое memo
         */
        if (!user.role) return // Если пользователь авторизован
        //Увеличиваем клик для визуального оформления
        setClick(++click);
        if (memo.current.value.length === 0) setNoMemo(true) // Показываем Error что не указан memo
        if (memo.current.value.length > 0) {
            setNoMemo(false)
            setClick(0)
        }  // Убираем Error если memo указан
        if (memo.current.value.length === 0) return  // Если memo не указан не запускаем счетчик
        setStart(true); // Отображение кнопки pause
        tick(); // Запускает счетчик

        if (memo.current.value !== localStorage.getItem('oldmemo')) {
            setSaveData(true); // Делаем true если мемо не совпадает
            resetTimer();
            // Если memo поменялось делаем возможным новую запись в базу
        }
        localStorage.setItem('memo', memo.current.value)
    }

    const handlePause = () => {
        tick();
        dispatch(getTasks(user.id))
        setStart(false); // Отображение кнопки play
        getTime(hours, minutes, seconds)
        timeStamp.memo = memo.current.value
        localStorage.setItem('timeStamp', JSON.stringify(timeStamp))

        //saveData по дефолту true
        if (!saveData) { //если false обновляем запись в базе
            let id = tasks.filter(task => {
                return task.memo === memo.current.value
            }) //В массиве tasks находим memo равное значению из инпута
            if (!id) return
            if (id[0]?.memo === localStorage.getItem('oldmemo')) {
                /**
                 * Если memo из фильтра равно oldmemo
                 * парсим timeStamp из localStorage
                 * Запоняем новыми данными обьект и отправляем для обновления
                 */
                let time = JSON.parse(localStorage.getItem('timeStamp'));
                return dispatch(updateTime({
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds,
                    memo: localStorage.getItem('oldmemo'),
                    usid: user.id,
                    taskId: id[0].id,
                }))
            } else {
                /**
                 * Если memo из фильтра нет, значит записи в базе о задаче нет
                 * Делаем новую запись в базу отправляя timeStamp и id пользователя
                 * Флаг saveData true saveTaskPackage возможен
                 * Переводим флаг saveData в false
                 */
                console.log(user.id)
                if (user.id) {
                    dispatch(saveTaskPackage({ timeStamp, id: user.id }))//Запись в базу новых данных только через saveData(true)
                    setSaveData(false)
                }

            }
        } else {
            /**
             * если saveData true делаем новую запись в базе/ saveData делаем false
             * В массиве tasks находим memo равное значению из инпута
             */
            let id = tasks.filter(task => {
                return task.memo === memo.current.value
            })
            if (!id) return
            if (id[0]?.memo === localStorage.getItem('memo')) {
                /**
                 * Если memo из фильтра равно memo
                 * парсим timeStamp из localStorage
                 * Запоняем новыми данными обьект и отправляем для обновления
                 */
                let time = JSON.parse(localStorage.getItem('timeStamp'));
                return dispatch(updateTime({
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds,
                    memo: localStorage.getItem('memo'),
                    usid: user.id,
                    taskId: id[0].id,
                }))
            } else {
                dispatch(saveTaskPackage({ timeStamp, id: user.id }))//Запись в базу новых данных только через saveData(true)
                setSaveData(false)
            }
            // Отключаем запись в базу, думая что задача не поменялась следущая задача обновить ту же запись в базе
        }
    }

    return (
        <div className={classes.root}>
            {user ? <h2>{weekDayName} {day}, {month}</h2> : <p>Hello</p>}
            {user &&
                <div className={classes.form_wrapper}>
                    <div className={classes.timer_wrapper}>
                        <section className={classes.timer_hours}>
                            <span className={(+localStorage.getItem('hour') >= +localStorage.getItem('timeLimit')) ? classes.danger : null}>
                                {zero(hours)}
                            </span>
                            <span>Hours</span>
                        </section>
                        <div className={classes.divider}>
                            <span>:</span>
                        </div>
                        <section className={classes.timer_minutes}>
                            <span className={(+localStorage.getItem('hour') >= +localStorage.getItem('timeLimit')) ? classes.danger : null}>{zero(minutes)}</span>
                            <span>Minutes</span>
                        </section>
                        <div className={classes.divider}>
                            <span>:</span>
                        </div>
                        <section className={classes.timer_seconds}>
                            <span className={(+localStorage.getItem('hour') >= +localStorage.getItem('timeLimit')) ? classes.danger : null}>{zero(seconds)}</span>
                            <span>Seconds</span>
                        </section>
                        <section className={classes.timer_button}>

                            {!start ?
                                <FontAwesomeIcon icon={faPlay}
                                    className={classes.timer_icons_play}
                                    onClick={(e) => {
                                        handlePlay(e)
                                    }} />
                                :
                                <FontAwesomeIcon icon={faPause}
                                    className={classes.timer_icons_pause}
                                    onClick={() => {
                                        handlePause()
                                    }} />
                            }
                        </section>
                    </div>
                    {noMemo && <Error message='You have not chosen a memo'
                        click={click}
                    />}

                    <input type='text'
                        className={
                            (click > 1) ? classes.dificultCase : classes.inputMemo
                        }
                        ref={memo}
                        onChange={() => {
                            let id = tasks.filter(task => {
                                return task.memo === memo.current.value
                            })
                            setHours(id[0]?.hours || 0)
                            setMinutes(id[0]?.minutes || 0)
                            setSeconds(id[0]?.seconds || 0)
                            localStorage.setItem('oldmemo', memo.current.value)
                        }} />
                </div>

            }
            <Options start={start} />
        </div>
    );
};

export default Home;

