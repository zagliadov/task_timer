import { useEffect, FC } from 'react';
import { getTasks } from '../../../features/Tasks/tasksSlice';
import PleaseLogIn from '../../../features/utils/PleaseLogIn/PleaseLogIn';
import Diagram from './Diagram/Diagram';
import {useAppDispatch, useAppSelector} from '../../../features/store';
import { RootState } from '../../../features/store';



type IStartProps = {
    start: boolean,
}
type ITasks = {
    firstname: string,
    memo: string,
    userId: number,
    id: number,
    createdAt: string,
    hours: string,
    minutes: string,
    seconds: string,
}

const TaskTable: FC<IStartProps> = ({ start }) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.user.user);
    const tasks: ITasks | undefined | [] = useAppSelector((state: RootState) => state.tasks.tasks);
    
    useEffect(() => {
        dispatch(getTasks(user.id))
    }, [dispatch, start, user])

    return (
        <div>
            <PleaseLogIn />
            <Diagram tasks={tasks} start={start} />
        </div>
    );
};

export default TaskTable;