import {makeAutoObservable} from "mobx";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../app-reducer";
import { FilterValuesType} from "../../features/TodolistsList/todolists-reducer";
import {useRootStore} from "./RootStateContext";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

class TodoStore {

    constructor() {
        makeAutoObservable(this)
    }

    initialState = {todos: [] as TodolistDomainType[]}


    async fetchTodo() {
        const res = await todolistsAPI.getTodolists()


        if (res.data && res.data.length > 0) {
            this.initialState.todos = res.data.map(d => ({...d, filter: 'all', entityStatus: 'idle'}))
            // this.initialState.todos.forEach(tl=>taskStore.fetchTasks(tl.id))
        }
    }


    async addTodo(title: string) {
        try {
            const res = await todolistsAPI.createTodolist(title)
            this.initialState.todos = [...this.initialState.todos, {
                ...res.data.data.item,
                filter: 'all',
                entityStatus: 'idle'
            }]
        } catch (e) {

        } finally {

        }
    }

    async deleteTodo(id: string) {
        await todolistsAPI.deleteTodolist(id)
        this.initialState.todos = this.initialState.todos.filter(tl => tl.id != id)
    }

    changeTodolistFilter(id: string, filter: FilterValuesType) {
        this.initialState.todos = this.initialState.todos.map(tl => tl.id === id ? {...tl, filter: filter} : tl)
    }

    async changeTodolistTitle(id: string, title: string) {
        await todolistsAPI.updateTodolist(id, title)
        this.initialState.todos = this.initialState.todos.map(tl => tl.id === id ? {...tl, title} : tl)
    }

}

// const StoreContext = createContext<Todo>(new Todo());
//
//
// const StoreProvider: FC<{ store: Todo }> = ({children, store}) => (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// );
//
// const useTodosStore = () => {
//     return useContext(StoreContext);
// }
// export {Todo, StoreProvider, useTodosStore};
export default TodoStore;