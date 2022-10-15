import {makeAutoObservable} from "mobx";
import {authAPI} from "../../api/todolists-api";
import {createContext, FC, useContext} from "react";
import React from 'react'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

class AppStore {

    constructor() {
        makeAutoObservable(this)
    }

    initialState: InitialStateType = {
        status: 'idle',
        error: null,
        isInitialized: false
    }

    setAppStatus(status: RequestStatusType) {
        this.initialState.status = status;
    }

    setAppError(error: string | null) {
        this.initialState.error = error;
    }

    async initializeApp() {
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === 0) {
                this.initialState.isInitialized = true;
            }
        } catch (e) {

        } finally {

        }
    }

}

// const StoreContext = createContext<Appmobx>(new Appmobx());
//
//
// const StoreProvider: FC<{ store: Appmobx }> = ({children, store}) => (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// );
//
// const useAppmobxStore = () => {
//     return useContext(StoreContext);
// }
// export {Appmobx, StoreProvider, useAppmobxStore};
 export default AppStore