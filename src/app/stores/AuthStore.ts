import {makeAutoObservable} from "mobx";
import {authAPI, LoginParamsType, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {createContext, FC, useContext} from "react";
import React from 'react'
import {RequestStatusType} from "../app-reducer";
import {FilterValuesType} from "../../features/TodolistsList/todolists-reducer";
import {setIsLoggedInAC} from "../../features/Login/auth-reducer";

type InitialStateType = {
    isLoggedIn: boolean
}

class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

    initialState: InitialStateType = {
        isLoggedIn: false
    }

    async setIsLoggedIn(data: LoginParamsType) {
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === 0) {
                this.initialState.isLoggedIn =  true;
            }
        } catch (e) {
        } finally {
        }
    }

    async setIsLoggedOut() {
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                this.initialState.isLoggedIn = false;
            }
        } catch (e) {
        } finally {
        }
    }

}

// const StoreContext = createContext<Auth>(new Auth());
//
//
// const StoreProvider: FC<{ store: Auth }> = ({children, store}) => (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// );
//
// const useAuthStore = () => {
//     return useContext(StoreContext);
// }
// export {Auth, StoreProvider, useAuthStore};
export default AuthStore;