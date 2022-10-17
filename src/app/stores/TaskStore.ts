import {makeAutoObservable} from "mobx";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../api/todolists-api";


// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

class TaskStore {

    constructor() {
        makeAutoObservable(this)
    }

    initialState = {
        tasks: {} as TasksStateType
    }

    async fetchTasks(todolistId: string) {
        await todolistsAPI.getTasks(todolistId)
            .then(resp=>{
                this.initialState.tasks = {...this.initialState.tasks, [todolistId]: resp.data.items}
            })
    }

    async addTask(taskTitle: string, todolistId: string) {
        const res = await todolistsAPI.createTask(todolistId, taskTitle)
        const task: TaskType = res.data.data.item
        console.log('task', JSON.stringify(task))
        this.initialState.tasks = {
            ...this.initialState.tasks,
            [todolistId]: [task, ...this.initialState.tasks[task.todoListId]]
        }
    }

    async deleteTask(taskId: string, todolistId: string) {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        this.initialState.tasks = {
            ...this.initialState.tasks,
            [todolistId]: this.initialState.tasks[todolistId].filter(t => t.id !== taskId)
        }
        console.log('render')
    }
    async updateTask(taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) {
        const task =  this.initialState.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel
            }

        try {
            const res = await todolistsAPI.updateTask(todolistId,taskId,apiModel)
            if (res.data.resultCode === 0) {

               this.initialState.tasks =  {
                ...this.initialState.tasks,
                    [todolistId]: this.initialState.tasks[todolistId]
                    .map(t => t.id === taskId ? {...t, ...domainModel} : t)
                }
            }
        } catch (e) {

        } finally {

        }
        }
    }

}

// const StoreContext = createContext<Tasks>(new Tasks());
//
//
// const StoreProvider: FC<{ store: Tasks }> = ({children, store}) => (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// );
//
// const useTaskStore = () => {
//     return useContext(StoreContext);
// }
// export {Tasks, StoreProvider, useTaskStore};
export default TaskStore;