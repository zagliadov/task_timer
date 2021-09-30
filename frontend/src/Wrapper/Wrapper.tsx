import { FC } from 'react';
import classes from './wrapper.module.sass';
import { IClasses} from '../features/interfaces/interface';


const Wrapper: FC = ({ children }) => {
    const { wrapper }: IClasses = classes;
    return (
        <div className={wrapper}>
            {children}
        </div>
    );
};

export default Wrapper;