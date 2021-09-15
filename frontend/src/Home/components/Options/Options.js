import React from 'react';
import Limitation from '../Limitation/Limitation';
import TaskTable from '../TaskTable/TaskTable';
import OneMoreFunction from '../OneMoreFunction/OneMoreFunction';
import { Link, Switch, Route } from 'react-router-dom';
import classes from './options.module.sass';


const Options = ({start}) => {

    
    return (
        <section className={classes.options_wrapper}>
            <h2>Options</h2>
            <menu>
                <Link to='/limitations' className={classes.link} >Time limit</Link>
                <Link to='/tasktable' className={classes.link} >Task table</Link>
                <Link to='/onemorefunction' className={classes.link} >One more function</Link>
            </menu>

     




            <Switch>
                <Route path="/limitations">
                    <Limitation />
                </Route>
                <Route path="/tasktable">
                    <TaskTable start={start}/>
                </Route>
                <Route path="/onemorefunction">
                    <OneMoreFunction />
                </Route>
            </Switch>
        </section>
    );
};

export default Options;