import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button,IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
import { Link } from 'react-router-dom'
import {observer} from "mobx-react";
import {useRootStore} from "../../../app/stores/RootStateContext";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const Todolist = observer((props:PropsType) => {
    const {todoStore} = useRootStore()
    const {taskStore} = useRootStore()

    useEffect(() => {
        taskStore.fetchTasks(props.todolist.id)
    }, [taskStore, props.todolist.id])

    const addTask = useCallback(function (title: string) {
        taskStore.addTask(title,props.todolist.id)
    }, [taskStore,props.todolist.id])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        todoStore.changeTodolistFilter(todolistId,value)
    }, [todoStore])

    const removeTodolist = useCallback(function (id: string) {
        todoStore.deleteTodo(id)
    }, [todoStore])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        todoStore.changeTodolistTitle(id,title)
    }, [todoStore])


    const onAllClickHandler = useCallback(() => changeFilter('all', props.todolist.id), [props.todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', props.todolist.id), [props.todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.todolist.id), [props.todolist.id, changeFilter])


    let tasksForTodolist = props.tasks


    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div  style={{border:'1px solid black',padding:'10px', background:"white"}}>
        <h3><EditableSpan  value={props.todolist.title} onChange={()=>changeTodolistTitle(props.todolist.id,props.todolist.title)}/>
            <IconButton onClick={()=>removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist?.map(t =>{

                   // return <Link to={`taskItem/${props.todolist.id}`}>
                   // @ts-ignore
                    return <Link to={`/todolistItem/${props.todolist.id}/taskItem/${t.id}`}>

                    <Task key={t.id} task={t} todolistId={props.todolist.id}
                        // removeTask={props.removeTask}
                        // changeTaskTitle={props.changeTaskTitle}
                        // changeTaskStatus={props.changeTaskStatus}
                    />
                   </Link>

                })
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


