import { FC } from 'react';
import classes from './wrapper.module.sass';
import { IClasses} from '../features/interfaces/interface';
import { useAppSelector, RootState } from '../features/store';

const Wrapper: FC = ({ children }) => {
    const { white_wrapper, black_wrapper }: IClasses = classes;
    const color = useAppSelector((state: RootState) => state.user.color);
    return (
        <div className={color ? white_wrapper : black_wrapper}>
            {children}
        </div>
    );
};

export default Wrapper;