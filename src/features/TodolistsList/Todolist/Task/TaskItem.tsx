import React, {useEffect} from 'react';
import {Task} from "./Task";
import {useParams} from "react-router-dom";
import {useRootStore} from "../../../../app/stores/RootStateContext";
import {observer} from "mobx-react";

const TaskItem = observer(() => {
    const {taskId, todoId} = useParams()//{id: 'kjh'}
    const {taskStore} = useRootStore()
    // console.log(JSON.stringify(taskStore))
    // console.log(id)
    useEffect( () => {
        taskStore.fetchTasks(taskId)
    }, [])

    const tasks = taskStore.initialState.tasks

    const todoTasks = tasks[todoId]

    const taskItem = todoTasks.find(task => task.id === taskId)


    return (
        <div>
            {
                taskItem &&   <Task task={taskItem} todolistId={todoId}/>
            }
                </div>
    );
});

export default TaskItem;