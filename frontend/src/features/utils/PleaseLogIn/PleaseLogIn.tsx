import { FC } from 'react';
import classes from './pleaselogin.module.sass';
import { useAppSelector, RootState } from '../../store';

const PleaseLogIn: FC = () => {
    const user = useAppSelector((state: RootState) => state.user.user);
    const color = useAppSelector((state: RootState) => state.user.color);
    const { white__theme_wrapper, black__theme_wrapper } = classes


    return (
        <h3 className={color ? white__theme_wrapper : black__theme_wrapper}>
            Hello {user ? user.firstname : 'guest! Please log in'}
        </h3>
    );
};

export default PleaseLogIn;