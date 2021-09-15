import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../features/Tasks/tasksSlice';
import PleaseLogIn from '../../../features/utils/PleaseLogIn/PleaseLogIn';
import Diagram from './Diagram/Diagram';



const TaskTable = ({ start }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const tasks = useSelector(state => state.tasks.tasks);

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