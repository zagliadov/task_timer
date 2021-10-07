import { FC } from 'react';
import {zero} from '../../../../../features/utils/utils';


type ITotalElapsedTimeProps = {
    hour: number,
    minutes: number,
    seconds: number,
    danger: string,
    lite: string,
}

const TotalElapsedTime: FC<ITotalElapsedTimeProps> = ({hour, minutes, seconds, danger, lite}) => {
    return (
        <div>
            <p>Total elapsed time</p>
            <span className={Number(localStorage.getItem('hour')) >= Number(localStorage.getItem('timeLimit')) ? danger : lite}>
                {zero(String(hour))}:{zero(String(minutes))}:{zero(String(seconds))}
            </span>
            {(Number(localStorage.getItem('hour')) >= Number(localStorage.getItem('timeLimit'))) ? <span> You have exceeded the time limit</span> : null}
        </div>
    );
};

export default TotalElapsedTime;