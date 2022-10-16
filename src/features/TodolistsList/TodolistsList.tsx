import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    FilterValuesType,
} from './todolists-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import { Redirect } from 'react-router-dom'
import {observer} from "mobx-react";
import {useRootStore} from "../../app/stores/RootStateContext";
import AuthStore from "../../app/stores/AuthStore";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = observer(({demo = false}) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()
    const {authStore} = useRootStore()
    const todolists = todoStore.initialState.todos
    const tasks = taskStore.initialState.tasks
    // const isLoggedIn = authStore.initialState.isLoggedIn

    useEffect( () => {
        if (demo || !isLoggedIn) {
            return;
        }
        todoStore.fetchTodo()
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        taskStore.deleteTask(id,todolistId)
    }, [taskStore])

    // const addTask = useCallback(function (title: string, todolistId: string) {
    //     taskStore.addTask(title,todolistId)
    // }, [taskStore])

    // const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    //     taskStore.updateTask(id, {status},todolistId)
    // }, [taskStore])

    // const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
    //     taskStore.updateTask(id, {title},todolistId)
    // }, [taskStore])

    // const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    //     todoStore.changeTodolistFilter(todolistId,value)
    // }, [])
    //
    // const removeTodolist = useCallback(function (id: string) {
    //     todoStore.deleteTodo(id)
    // }, [todoStore])
    //
    // const changeTodolistTitle = useCallback(function (id: string, title: string) {
    //     todoStore.changeTodolistTitle(id,title)
    // }, [todoStore])

    const addTodolist = useCallback((title: string) => {
        todoStore.addTodo(title)
    }, [todoStore])


    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    const onClickRedirectToTodo = () => {
                        return <Redirect to={'todolistItem/:id'} />
                    }

                    return <Grid item key={tl.id} >
                        <Paper style={{padding: '10px'}} onClick={onClickRedirectToTodo}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
})
