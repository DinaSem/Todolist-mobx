import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Todolist} from "./Todolist/Todolist";
import {useRootStore} from "../../app/stores/RootStateContext";
import {observer} from "mobx-react";



const TodolistItem = observer(() => {
    const {id} = useParams()//{id: 'dwakojiefuorifjoetib'}
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()
    console.log(JSON.stringify(taskStore))
    console.log(id)
    useEffect( () => {
        taskStore.fetchTasks(id)
    }, [])

    const todolists = todoStore.initialState.todos
    const tasks = taskStore.initialState.tasks
    // console.log('todos, ', todolists)
    const todolistsItem = todolists?.find(t=> t.id === id)
    const tasksTodolistsItem = tasks[id]

    // console.log('todo', todolistsItem);
    console.log('task, ', tasks);


    return (
        <div>
            {
                todolistsItem && tasksTodolistsItem && <Todolist todolist={todolistsItem} tasks={tasksTodolistsItem}/>
            }

        </div>
    );
});

export default TodolistItem;