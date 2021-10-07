import { FC } from 'react';
import Limitation from '../Limitation/Limitation';
import TaskTable from '../TaskTable/TaskTable';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { Link, Switch, Route, useLocation } from 'react-router-dom';
import classes from './options.module.sass';
import { useAppSelector, RootState } from '../../../features/store';
import { useTransition, animated } from 'react-spring'
import { IClasses } from '../../../features/interfaces/interface';
import Payment from '../Payment/Payment';


type IOptionProps = {
    start: boolean,
}
type IOptionLocation = {
    pathname?: string,
    hash?: string,
    key?: string,
    search?: string,
    state?: string,
}

const Options: FC<IOptionProps> = ({ start }) => {

    const {
        white__theme_options_wrapper,
        link,
        black__theme_option_wrapper }: IClasses = classes;
    const color = useAppSelector((state: RootState) => state.user.color);
    const location = useLocation<IOptionLocation>();
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
        <section className={color ? black__theme_option_wrapper : white__theme_options_wrapper} style={{ position: 'relative' }}>
            <h2>Options</h2>
            <menu>
                <Link to='/limitations' className={link} >Time limit</Link>
                <Link to='/tasktable' className={link} >Task table</Link>
                <Link to='/completedtasks' className={link} >Completed tasks</Link>
            </menu>

            {
                transition((props, item) => (
                    <animated.div style={props}>
                        <div style={{ position: 'absolute', width: '100%' }}>
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
                                <Route path="/payment">
                                    <Payment />
                                </Route>
                            </Switch>
                        </div>
                    </animated.div>
                ))
            }
        </section>
    );
};

export default Options;