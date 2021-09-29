import { FC } from 'react';
import classes from './pleaselogin.module.sass';
import { useAppSelector, RootState } from '../../store';

const PleaseLogIn: FC = () => {
    const user = useAppSelector((state: RootState) => state.user.user)
    const { wrapper } = classes


    return (
        <h3 className={wrapper}>
            Hello {user ? user.firstname : 'guest! Please log in'}
        </h3>
    );
};

export default PleaseLogIn;