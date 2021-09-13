import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './home.module.sass';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { transformTime } from '../features/utils/utils';
import { saveTaskPackage, updateTime } from '../features/Timer/timerSlice';
import Options from './components/Options/Options';
import Error from '../Error/Error';

const Home = () => {
    const user = useSelector(state => state.user.user);
    //const taskPackage = useSelector(state => state.timer.package)
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

    let tasks = useSelector(state => state.tasks.tasks)





    const timer = useRef(null);

    let tick = () => {
        //Запускает и оставнавливает счетчик
        if (!timer.current) {
            timer.current = setInterval(() => setSeconds(seconds => +seconds + 1), 1000)
            
        } else {
            clearInterval(timer.current);
            timer.current = null
        }
    }

    let timeFrameControl = (seconds, minutes, hours) => {
        //Ф. не дает выйти за рамки 60 секунд, минут, часов
        if (seconds > 60) {
            setSeconds(0)
            setMinutes(minutes => +minutes + 1)
        }
        if (minutes > 60) {
            setMinutes(0)
            setHours(hours => +hours + 1)
        }
        if (hours > 60) {
            setHours(0)
        }
    }

    useEffect(() => {
        timeFrameControl(+seconds, +minutes, +hours)
    }, [seconds, minutes, hours]);



    let zero = (item) => {
        if (item < 10) return '0' + item
        return item
    }

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
        setClick(++click)
        
        if (memo.current.value.length === 0) setNoMemo(true)  // Показываем Error что не указан memo
        if (memo.current.value.length > 0) {
            setNoMemo(false)
            setClick(0)
        }  // Убираем Error если memo указан
        if (memo.current.value.length === 0) return  // Если memo не указан не запускаем счетчик
        setStart(true); // Отображение кнопки pause
        tick();
        
        if (memo.current.value !== localStorage.getItem('memo')) {
            setSaveData(true); // Делаем true если мемо не совпадает
        //    if(+minutes > 0 || +seconds > 0) return
    
             resetTimer();
            // Если memo поменялось делаем возможным новую запись в базу
        }

        localStorage.setItem('memo', memo.current.value)
        //dispatch(getMemo({ memo: localStorage.getItem('memo'), id: user.id }))
    }
    

    const handlePause = () => {
        tick();
        setStart(false); // Отображение кнопки play
        getTime(hours, minutes, seconds)
        timeStamp.memo = memo.current.value
        localStorage.setItem('timeStamp', JSON.stringify(timeStamp))

        //saveData по дефолту true
        if (!saveData) { //если false обновляем запись в базе
            let id = tasks.filter(task => {
                return task.memo === memo.current.value
            })
            if (!id) return
            if (id[0]?.memo === localStorage.getItem('memo')) {

                let time = JSON.parse(localStorage.getItem('timeStamp'));
                return dispatch(updateTime({
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds,
                    memo: localStorage.getItem('memo'),
                    usid: user.id,
                    taskId: id[0].id,
                }))
            }

        } else {
            // если saveData true делаем новую запись в базе/ saveData делаем false
            let id = tasks.filter(task => {
                return task.memo === memo.current.value
            })
            if (!id) return
            if (id[0]?.memo === localStorage.getItem('memo')) {

                // setSaveData(false)
                let time = JSON.parse(localStorage.getItem('timeStamp'));
                console.log(id[0].hours)
                return dispatch(updateTime({
                    hours: time.hours,
                    minutes: time.minutes ,
                    seconds: time.seconds,
                    memo: localStorage.getItem('memo'),
                    usid: user.id,
                    taskId: id[0].id,
                }))
            }
            dispatch(saveTaskPackage({ timeStamp, id: user.id })) //Запись в базу новых данных только через saveData(true)
            setSaveData(false)// Отключаем запись в базу, думая что задача не поменялась следущая задача обновить ту же запись в базе
        }
        //если true сохраняем новую запись
    }


    return (
        <div className={classes.root}>
            {user ? <h2>{weekDayName} {day}, {month}</h2> : <p>Hello</p>}
            {user &&
                <div className={classes.form_wrapper}>
                    <div className={classes.timer_wrapper}>
                        <section className={classes.timer_hours}>
                            <span>
                                {zero(hours)}
                            </span>
                            <span>Hours</span>
                        </section>
                        <div className={classes.divider}>
                            <span>:</span>
                        </div>
                        <section className={classes.timer_minutes}>
                            <span>{zero(minutes)}</span>
                            <span>Minutes</span>
                        </section>
                        <div className={classes.divider}>
                            <span>:</span>
                        </div>
                        <section className={classes.timer_seconds}>
                            <span>{zero(seconds)}</span>
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
                            
                            localStorage.setItem('memo', memo.current.value)
                        }}/>
                </div>

            }

            <Options start={start}/>



        </div>
    );
};

export default Home;

