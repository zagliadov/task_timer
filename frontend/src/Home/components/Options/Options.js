import React from 'react';
import Limitation from '../Limitation/Limitation';
import SomeFunction from '../SomeFunction/SomeFunction';
import OneMoreFunction from '../OneMoreFunction/OneMoreFunction';
import { Link, Switch, Route } from 'react-router-dom';
import classes from './options.module.sass';


const Options = () => {
    return (
        <section className={classes.options_wrapper}>
            <h2>Options</h2>
            <menu>
                <Link to='/limitations' className={classes.link} >Time limit</Link>
                <Link to='/somefunction' className={classes.link} >Some function</Link>
                <Link to='/onemorefunction' className={classes.link} >One more function</Link>
            </menu>






            <Switch>
                <Route path="/limitations">
                    <Limitation />
                </Route>
                <Route path="/somefunction">
                    <SomeFunction />
                </Route>
                <Route path="/onemorefunction">
                    <OneMoreFunction />
                </Route>
            </Switch>
        </section>
    );
};

export default Options;