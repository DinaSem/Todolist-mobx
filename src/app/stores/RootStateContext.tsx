import React from 'react'
import TaskStore from "./TaskStore";
import AppStore from "./AppStore";
import AuthStore from "./AuthStore";
import TodoStore from "./TodoStore";


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
    return (
        <RootStateContext.Provider value={stores}>
            {children}
        </RootStateContext.Provider>
    )
}

export const useRootStore = () => React.useContext(RootStateContext)