import React from 'react';
import Limitation from '../Limitation/Limitation';
import TaskTable from '../TaskTable/TaskTable';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { Link, Switch, Route, useLocation } from 'react-router-dom';
import classes from './options.module.sass';
import { useTransition, animated } from 'react-spring'

const Options = ({ start }) => {

    const location = useLocation();

    const transition = useTransition(location, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    });


    return (
        <section className={classes.options_wrapper} style={{position: 'relative'}}>
            <h2>Options</h2>
            <menu>
                <Link to='/limitations' className={classes.link} >Time limit</Link>
                <Link to='/tasktable' className={classes.link} >Task table</Link>
                <Link to='/completedtasks' className={classes.link} >Completed tasks</Link>
            </menu>

            {
                transition((props, item) => (
                    <animated.div style={props}>
                        <div style={{position: 'absolute', width: '100%'}}>
                            <Switch location={item}>
                                <Route path="/limitations">
                                    <Limitation start={start} />
                                </Route>
                                <Route path="/tasktable">
                                    <TaskTable start={start} />
                                </Route>
                                <Route path="/completedtasks">
                                    <CompletedTasks />
                                </Route>
                            </Switch>
                        </div>

                    </animated.div>
                ))

            }
            {/* <Switch>
                <Route path="/limitations">
                    <Limitation start={start} />
                </Route>
                <Route path="/tasktable">
                    <TaskTable start={start} />
                </Route>
                <Route path="/completedtasks">
                    <CompletedTasks />
                </Route>
            </Switch> */}
        </section>
    );
};

export default Options;