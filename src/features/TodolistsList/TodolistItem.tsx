import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Todolist} from "./Todolist/Todolist";
import {useRootStore} from "../../app/stores/RootStateContext";
import {observer} from "mobx-react";

const TodolistItem = observer(() => {
    const {todoId} = useParams<{todoId:string}>()//{id: 'dwakojiefuorifjoetib'}
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()

    useEffect( () => {
        taskStore.fetchTasks(todoId)
    }, [taskStore, todoId])

    const todolists = todoStore.initialState.todos
    const tasks = taskStore.initialState.tasks
    const todolistsItem = todolists?.find(t=> t.id === todoId)
    const tasksTodolistsItem = tasks[todoId]


    return (
        <div style={{maxHeight:'100vh',display:'flex', justifyContent:"center",alignItems:'center'}}>
            {
                todolistsItem && tasksTodolistsItem && <Todolist todolist={todolistsItem} tasks={tasksTodolistsItem}/>
            }
        </div>
    );
});

export default TodolistItem;