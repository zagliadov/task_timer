import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './home.module.sass';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { transformTime } from '../features/utils/utils';

const Home = () => {
    const user = useSelector(state => state.user.user);
    const [start, setStart] = useState(false);


    let [second, setSecond] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [hours, setHours] = useState(0);
    let m = moment();
    let mydate = moment().format()
    let weekDayName = moment(mydate).format('dddd');
    let date = new Date();
    let day = transformTime(date.getDate())
    let month = moment().format('MMMM');

    const timer = useRef(null);


    let tick = () => {
        if (!timer.current) {
            timer.current = setInterval(() => setSecond(second => second + 1), 1)
        } else {
            clearInterval(timer.current);
            timer.current = null
        }


    }

    let timeFrameControl = (second, minutes, hours) => {
        if (second > 60) {
            setSecond(0)
            setMinutes(minutes => minutes + 1)
        }
        if (minutes > 60) {
            setMinutes(0)
            setHours(hours => hours + 1)
        }
        if (hours > 60) {
            setHours(0)
        }
    }

    useEffect(() => {
        timeFrameControl(second, minutes, hours)
    }, [second, minutes, hours])



    // console.log(moment().format('MMMM'))
    let zero = (item) => {
        if (item < 10) {
            return '0' + item
        }
        return item

    }


    return (
        <div>
            {user ? <h2>{weekDayName} {day}, {month}</h2> : <p>Hello</p>}

            {user &&
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
                        <span>{zero(second)}</span>
                        <span>Seconds</span>
                    </section>
                    <section className={classes.timer_button}>
                        {!start ?
                            <FontAwesomeIcon icon={faPlay}
                                className={classes.timer_icons_play}
                                onClick={() => {
                                    setStart(true)
                                    tick()
                                }} />
                            :
                            <FontAwesomeIcon icon={faPause}
                                className={classes.timer_icons_pause}
                                onClick={() => {
                                    tick()
                                    setStart(false)
                                }} />
                            
                        }

                    </section>
                </div>

            }


        </div>
    );
};

export default Home;

// {/* {(second < 10) ? '0' + second : second} */}