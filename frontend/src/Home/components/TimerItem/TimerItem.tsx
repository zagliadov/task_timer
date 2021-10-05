import { FC } from 'react';
import { zero } from '../../../features/utils/utils';
import {useAppSelector, RootState} from '../../../features/store';
import classes from './timeritem.module.sass';
import {IClasses} from '../../../features/interfaces/interface';

type ITimerItemProps = {
    propStyle: string,
    timeName: string,
    timeType: number,
}

const TimerItem: FC<ITimerItemProps> = ({ propStyle, timeName, timeType }) => {
    
    const {white__theme_txt, black__theme_txt}: IClasses = classes;
    const color = useAppSelector((state: RootState) => state.user.color);

    return (
        <section className={propStyle}>
            <span>
                {zero(String(timeType))}
            </span>
            <span className={color ? black__theme_txt : white__theme_txt}>{timeName}</span>
        </section>
    );
};

export default TimerItem;