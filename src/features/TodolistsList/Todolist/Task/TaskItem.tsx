import React, {useEffect} from 'react';
import {Task} from "./Task";
import {useParams} from "react-router-dom";
import {useRootStore} from "../../../../app/stores/RootStateContext";
import {observer} from "mobx-react";

const TaskItem = observer(() => {

    const {taskId, todoId} = useParams<{taskId:string,todoId:string}>()//{id: 'kjh'}
    const {taskStore} = useRootStore()
    // console.log(JSON.stringify(taskStore))
    // console.log(id)
    useEffect( () => {
        taskStore.fetchTasks(taskId)
    }, [taskStore])

    const tasks = taskStore.initialState.tasks

    const todoTasks = tasks[todoId]

    const taskItem = todoTasks.find(task => task.id === taskId)


    return (
        <div style={{border:'1px solid black',padding:'10px', background:"white",maxWidth:'max-content'}}>
            {
                taskItem &&   <Task task={taskItem} todolistId={todoId}/>
            }
                </div>
    );
});

export default TaskItem;