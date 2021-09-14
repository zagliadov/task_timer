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
        if (user.length === 0) return
        dispatch(getTasks(user.id))
    }, [user, dispatch])

    useEffect(() => {
        dispatch(getTasks(user.id))
    }, [start, dispatch, user.id])


    return (
        <div>
            <PleaseLogIn />

            {/* {tasks && tasks.map(task => {
                return (
                    <div key={task.id}>
                        <p>Task: {task.memo} time: {task.hours}:{task.minutes}:{task.seconds}</p>
                    </div>
                )
            })} */}
            {(user.role) && 
            <Diagram tasks={tasks} />
            }
            
        </div>
    );
};

export default TaskTable;