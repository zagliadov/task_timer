import { FC } from 'react';
import moment from 'moment';
import { transformTime } from '../../../features/utils/utils';
import {useAppSelector, RootState} from '../../../features/store';
import classes from './headcurrentdate.module.sass';
import {IClasses} from '../../../features/interfaces/interface';

const HeadCurrentDate: FC = () => {

    const {white__theme_txt, black__theme_txt}: IClasses = classes;
    const user = useAppSelector((state: RootState) => state.user.user);
    const color = useAppSelector((state: RootState) => state.user.color);

    let mydate: any = moment().format(),
        weekDayName: any = moment(mydate).format('dddd'),
        date: Date = new Date(),
        day: string = transformTime(date.getDate().toString()),
        month: any = moment().format('MMMM');

    return (
        <div className={color ? black__theme_txt : white__theme_txt}>
            {user ? <h2>{weekDayName} {day}, {month}</h2> : <p>Hello</p>}
        </div>
    );
};

export default HeadCurrentDate;