import { FC } from 'react';
import classes from './nav.module.sass';
import { Link } from "react-router-dom";
import { userRemove, tokenRemove } from '../../../features/Auth/userSlice'
import { removeTimeLimit } from '../../../features/Timer/timerSlice'
import { removeTasksFromState } from '../../../features/Tasks/tasksSlice';
import { RootState } from '../../../features/store';
import { useAppSelector, useAppDispatch } from '../../../features/store';

const Nav: FC = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.user.user);

    const clean = (): void => {
        if (!localStorage.getItem('token')) return
        dispatch(userRemove({}));
        dispatch(tokenRemove(''));
        dispatch(removeTimeLimit(0));
        localStorage.clear();
        dispatch(removeTasksFromState([]));
    }
    const clearLocalStorage = (): void => {
        /**
         * Помогает избежать ошибку при которой переход по ссылке Sign In 
         * невозможен из-за наличия токена в localStorage
         */
         localStorage.clear();
    }

    return (
        <nav className={classes.nav}>
            {(user.role === 'user' || user.role === 'admin') ?
                <>
                    <Link to='/' className={classes.link}
                        onClick={() => {
                            clean()
                        }}
                    >Sign Out</Link>
                </>
                :
                <>
                    <Link to='/signin'
                        onClick={() => clearLocalStorage()} 
                        className={classes.link}>Sign In</Link>
                    <Link to='/signup' className={classes.link} >Sign Up</Link>
                </>
            }
        </nav>
    );
};

export default Nav;