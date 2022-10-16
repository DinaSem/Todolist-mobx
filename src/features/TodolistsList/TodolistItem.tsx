import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Todolist} from "./Todolist/Todolist";
import {useRootStore} from "../../app/stores/RootStateContext";
import {observer} from "mobx-react";



const TodolistItem = observer(() => {
    const {todoId} = useParams()//{id: 'dwakojiefuorifjoetib'}
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()
    // console.log(JSON.stringify(taskStore))
    // console.log(id)
    useEffect( () => {
        taskStore.fetchTasks(todoId)
    }, [])

    const todolists = todoStore.initialState.todos
    const tasks = taskStore.initialState.tasks
    // console.log('todos, ', todolists)
    const todolistsItem = todolists?.find(t=> t.id === todoId)
    const tasksTodolistsItem = tasks[todoId]

    // console.log('todo', todolistsItem);
    // console.log('todolists, ', todolists);


    return (
        <div>
            {
                todolistsItem && tasksTodolistsItem && <Todolist todolist={todolistsItem} tasks={tasksTodolistsItem}/>
            }

        </div>
    );
});

export default TodolistItem;