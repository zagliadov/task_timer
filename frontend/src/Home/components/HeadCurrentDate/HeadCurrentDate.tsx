import { FC } from 'react';
import moment from 'moment';
import { transformTime } from '../../../features/utils/utils';
import {useAppSelector, RootState} from '../../../features/store';

const HeadCurrentDate: FC = () => {

    const user = useAppSelector((state: RootState) => state.user.user);
    
    let mydate: any = moment().format(),
        weekDayName: any = moment(mydate).format('dddd'),
        date: Date = new Date(),
        day: string = transformTime(date.getDate().toString()),
        month: any = moment().format('MMMM');

    return (
        <div>
            {user ? <h2>{weekDayName} {day}, {month}</h2> : <p>Hello</p>}
        </div>
    );
};

export default HeadCurrentDate;