import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../features/Tasks/tasksSlice';


const TaskTable = ({start}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const tasks = useSelector(state => state.tasks.tasks);
    useEffect(() => {
        if (user.length === 0) return
        dispatch(getTasks(user.id))
        if(user.length === 0) return
        console.log(tasks)
    }, [user])

   useEffect(() => {
    dispatch(getTasks(user.id))

   }, [start])


    return (
        <div>
            <h3>Hello {tasks && tasks[0]?.firstname}</h3>
            {tasks && tasks.map(task => {
                return (
                    <div key={task.id}>
                        <p>Task: {task.memo} time: {task.hours}:{task.minutes}:{task.seconds}</p>

                    </div>
                )
            })}
        </div>
    );
};

export default TaskTable;