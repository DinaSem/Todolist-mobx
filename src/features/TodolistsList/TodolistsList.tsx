import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import { Redirect } from 'react-router-dom'
import {observer} from "mobx-react";
import {useRootStore} from "../../app/stores/RootStateContext";
import { Link } from 'react-router-dom'

export const TodolistsList = observer(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()
    const todolists = todoStore.initialState.todos
    const tasks = taskStore.initialState.tasks
    // const isLoggedIn = authStore.initialState.isLoggedIn

    useEffect( () => {
        todoStore.fetchTodo()
    }, [todoStore])

    const addTodolist = useCallback((title: string) => {
        todoStore.addTodo(title)
    }, [todoStore])


    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }
    return <div >
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
                            <Link to={`todolistItem/${tl.id}`}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                            />
                            </Link>
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </div>
})
