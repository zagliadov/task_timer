import { FC } from 'react';
import { zero } from '../../../features/utils/utils';


type ITimerItemProps = {
    propStyle: string,
    timeName: string,
    timeType: number,
}

const TimerItem: FC<ITimerItemProps> = ({ propStyle, timeName, timeType }) => {

    return (
        <section className={propStyle}>
            <span>
                {zero(String(timeType))}
            </span>
            <span>{timeName}</span>
        </section>
    );
};

export default TimerItem;