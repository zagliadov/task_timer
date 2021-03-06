import { useState, useEffect, useRef, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../features/store';
import { RootState } from '../features/store';
import classes from './home.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { saveTaskPackage, updateTime } from '../features/Timer/timerSlice';
import { getTasks } from '../features/Tasks/tasksSlice';
import Options from './components/Options/Options';
import Error from '../Error/Error';

import TimerItem from './components/TimerItem/TimerItem';
import Divider from './components/Divider/Divider';
import HeadCurrentDate from './components/HeadCurrentDate/HeadCurrentDate';

const Home: FC = () => {

    /************************************* */
    type ICurrent = {
        current: number | null | any;
    }
    type ITaks = {
        firstname: string,
        createdAt: string,
        hours: string,
        id: number,
        memo: string,
        minutes: string,
        seconds: string,
        userId: number,
    }
    type IGetTime = {
        hours: number,
        minutes: number,
        seconds: number,
    }
    type ITimeStamp = {
        hours: number | string,
        minutes: number | string,
        seconds: number | string,
        memo: string,
    }
    /************************************* */

    const user = useAppSelector((state: RootState) => state.user.user),
        tasks = useAppSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useAppDispatch();

    const [start, setStart] = useState<boolean>(false), // Отображение кнопки play pause
        [noMemo, setNoMemo] = useState<boolean>(false),
        [saveData, setSaveData] = useState<boolean>(true);

    let [click, setClick] = useState<number>(0), // Сколько раз пользователь нажал плей без указания memo
        [seconds, setSeconds] = useState<number>(0),
        [minutes, setMinutes] = useState<number>(0),
        [hours, setHours] = useState<number>(0);

    let memo: any = useRef('');
    let timeStamp: any = {};

    const {
        root,
        timer_wrapper,
        timer_hours,
        timer_minutes,
        timer_seconds,
        divider,
        timer_button,
        timer_icons_pause,
        timer_icons_play,
        form_wrapper,
        inputMemo,
        dificultCase,
    } = classes;

    let hour: number = 0,
        minute: number = 0,
        second: number = 0;


    let countTotalTime = (item: ITaks[] | []) => {
        if (!item) return
        item.forEach((task: ITaks) => {
            if (Number(task.hours) === 0) return
            hour += Number(task.hours)
            if (Number(task.minutes) === 0) return
            minute += Number(task.minutes)
            if (Number(task.seconds) === 0) return
            second += Number(task.seconds)
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
        localStorage.setItem('hour', String(hour))
    }
    countTotalTime(tasks);

    let timer: ICurrent = useRef(null);
    let tick = (): void => {
        //Запускает и оставнавливает счетчик
        if (!timer.current) {
            timer.current = setInterval(() => {
                setSeconds((seconds: number) => +seconds + 1);
            }, 1);
        } else {
            clearInterval(timer.current);
            timer.current = null
        }
    }

    let timeFrameControl = (seconds: number, minutes: number, hours: number) => {
        //Ф. не дает выйти за рамки 60 секунд, минут, часов
        if (seconds > 59) {
            setSeconds(0)
            setMinutes((minutes: number) => minutes + 1)
        }
        if (minutes > 59) {
            setMinutes(0)
            setHours((hours: number) => hours + 1)
        }
        if (hours > 59) {
            setHours(0)
        }
    }

    useEffect(() => {
        timeFrameControl(seconds, minutes, hours);
    }, [seconds, minutes, hours]);

    useEffect(() => {
        if (typeof(user?.id) === 'undefined') return
        dispatch(getTasks(user.id));
    }, [dispatch, user?.id, start])

    let getTime = (h: number, m: number, s: number): IGetTime => {
        //Собирает значения полей времени в обьект
        return timeStamp = {
            hours: h,
            minutes: m,
            seconds: s,
        }
    }
    const resetTimer = (): void => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    }

    const handlePlay = (): void => {
        /**
         * Не дает включить счетчик если memo не заполнен
         * Следит за memo в инпуте и сравнивает с мемо в локальном хранилище
         * и если они идентичны продолжаешь считать время, если нет сбрасывает время
         * и пишет новое memo
         */
        if (!user.role) return; // Если пользователь авторизован
        //Увеличиваем клик для визуального оформления
        setClick(++click);
        if (memo.current.value.length === 0) setNoMemo(true);// Показываем Error что не указан memo
        if (memo.current.value.length > 0) {
            setNoMemo(false);
            setClick(0);
        }  // Убираем Error если memo указан
        if (memo.current.value.length === 0) return  // Если memo не указан не запускаем счетчик
        setStart(true); // Отображение кнопки pause
        tick(); // Запускает счетчик

        if (String(memo.current.value) !== String(localStorage.getItem('oldmemo'))) {
            setSaveData(true); // Делаем true если мемо не совпадает
            resetTimer();
            // Если memo поменялось делаем возможным новую запись в базу
        }
        localStorage.setItem('memo', memo.current.value);
    }

    const handlePause = (): any => {
        tick();
        dispatch(getTasks(user.id))
        setStart(false); // Отображение кнопки play
        getTime(hours, minutes, seconds)
        timeStamp.memo = String(memo.current.value)
        localStorage.setItem('timeStamp', JSON.stringify(timeStamp))

        //saveData по дефолту true
        if (!saveData) { //если false обновляем запись в базе
            let id: ITaks[] = tasks.filter((task: ITaks) => {
                return task.memo === String(memo.current.value)
            }) //В массиве tasks находим memo равное значению из инпута
            if (!id) return
            if (id[0]?.memo === localStorage.getItem('oldmemo')) {
                /**
                 * Если memo из фильтра равно oldmemo
                 * парсим timeStamp из localStorage
                 * Запоняем новыми данными обьект и отправляем для обновления
                 */
                let time: any = JSON.parse(localStorage.getItem('timeStamp') || '{}');
                return dispatch(updateTime({
                    hours: String(time.hours),
                    minutes: String(time.minutes),
                    seconds: String(time.seconds),
                    memo: String(localStorage.getItem('oldmemo')),
                    usid: Number(user.id),
                    taskId: Number(id[0].id),
                }));
            } else {
                /**
                 * Если memo из фильтра нет, значит записи в базе о задаче нет
                 * Делаем новую запись в базу отправляя timeStamp и id пользователя
                 * Флаг saveData true saveTaskPackage возможен
                 * Переводим флаг saveData в false
                 */
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
            if (!tasks) return
            let id: ITaks[] = tasks.filter((task: ITaks) => {
                return task.memo === String(memo.current.value)
            })
            if (!id) return
            if (id[0]?.memo === String(localStorage.getItem('memo'))) {
                /**
                 * Если memo из фильтра равно memo
                 * парсим timeStamp из localStorage
                 * Запоняем новыми данными обьект и отправляем для обновления
                 */

                let time: ITimeStamp = JSON.parse(localStorage.getItem('timeStamp') || '');
                return dispatch(updateTime({
                    hours: String(time.hours),
                    minutes: String(time.minutes),
                    seconds: String(time.seconds),
                    memo: String(localStorage.getItem('memo')),
                    usid: Number(user.id),
                    taskId: Number(id[0].id),
                }))
            } else {
                dispatch(saveTaskPackage({ timeStamp, id: user.id }))//Запись в базу новых данных только через saveData(true)
                setSaveData(false);
            }
            // Отключаем запись в базу, думая что задача не поменялась следущая задача обновить ту же запись в базе
        }
    }

    return (
        <div className={root}>
            <HeadCurrentDate />
            {user &&
                <div className={form_wrapper}>
                    <div className={timer_wrapper}>
                        <TimerItem propStyle={timer_hours} timeName={'Hours'} timeType={hours} />
                        <Divider propStyle={divider} />

                        <TimerItem propStyle={timer_minutes} timeName={'Minutes'} timeType={minutes} />
                        <Divider propStyle={divider} />

                        <TimerItem propStyle={timer_seconds} timeName={'Seconds'} timeType={seconds} />

                        <section className={timer_button}>
                            {!start ?
                                <FontAwesomeIcon icon={faPlay as IconProp}
                                    className={timer_icons_play}
                                    onClick={(): void => {
                                        handlePlay()
                                    }} />
                                :
                                <FontAwesomeIcon icon={faPause as IconProp}
                                    className={timer_icons_pause}
                                    onClick={(): void => {
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
                            (click > 1) ? dificultCase : inputMemo
                        }
                        ref={memo}
                        onChange={(): void | string => {
                            if (!tasks) return
                            let id: ITaks[] = tasks.filter((task: ITaks) => {
                                return task.memo === String(memo.current.value)
                            })
                            setHours(Number(id[0]?.hours) || 0)
                            setMinutes(Number(id[0]?.minutes) || 0)
                            setSeconds(Number(id[0]?.seconds) || 0)
                            localStorage.setItem('oldmemo', String(memo.current.value))
                        }} />
                </div>
            }
            <Options start={start} />
        </div>
    );
};

export default Home;

