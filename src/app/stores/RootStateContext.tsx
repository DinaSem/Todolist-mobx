import React, {useEffect} from 'react'
import TaskStore from "./TaskStore";
import AppStore from "./AppStore";
import AuthStore from "./AuthStore";
import TodoStore from "./TodoStore";
import {useParams} from "react-router-dom";


type TRootStateContext = {
    todoStore: TodoStore
    taskStore: TaskStore
    appStore: AppStore
    authStore: AuthStore
}
const RootStateContext = React.createContext<TRootStateContext>(
    {} as TRootStateContext
)
export const stores = {
    todoStore: new TodoStore(),
    taskStore: new TaskStore(),
    appStore: new AppStore(),
    authStore: new AuthStore(),
}



export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    useEffect( () => {
        stores.todoStore.fetchTodo()
    }, [stores.todoStore])
    return (
        <RootStateContext.Provider value={stores}>
            {children}
        </RootStateContext.Provider>
    )
}

export const useRootStore = () => React.useContext(RootStateContext)